import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UniqueConstraintError } from 'sequelize';
import { Classroom } from './entities/classroom.entity';
import { ClassroomRepository } from './classroom.repository';
import { StudentsService } from '../student/student.service';
import { CreateClassroomDto } from './dto/createClassroom.dto';

@Injectable()
export class ClassroomService {
  constructor(
    private readonly studentService: StudentsService,
    private readonly classroomRepository: ClassroomRepository,
  ) {}

  async create(classData: CreateClassroomDto): Promise<Classroom> {
    try {
      return await this.classroomRepository.create(classData);
    } catch (error) {
      //move error types and messages to const
      if (error instanceof UniqueConstraintError) {
        throw new ConflictException(
          `Classroom with ID: ${classData.id} already exists.`,
        );
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred while adding the classroom.',
      );
    }
  }

  async getAll(): Promise<Classroom[]> {
    return await this.classroomRepository.getAll();
  }

  async deleteById(classId: string): Promise<number> {
    const occupancy = await this.classroomRepository.getOccupancy(classId);

    if (occupancy > 0) {
      throw new BadRequestException(
        'class must be empty in order to delete it',
      );
    }
    const deleteCount = await this.classroomRepository.deleteById(classId);

    if (!deleteCount) {
      throw new NotFoundException(`Classroom ${classId} not found.`);
    }

    return deleteCount;
  }

  async getById(classId: string): Promise<Classroom> {
    const classroom = await this.classroomRepository.getById(classId);
    if (!classroom) {
      throw new NotFoundException(`Classroom with id ${classId} not found.`);
    }

    return classroom;
  }

  async assignStudent(classroomId: string, studentId: string) {
    const classroom = await this.getById(classroomId);
    const student = await this.studentService.getById(studentId);

    if (student.classroomId) {
      throw new ConflictException(
        `Student with id ${studentId} is already assigned to a class.`,
      );
    }

    const occupancy = await this.classroomRepository.getOccupancy(classroomId);

    if (occupancy >= classroom.maxOccupancy) {
      throw new ConflictException(
        `Classroom ${classroom.name} is at full occupancy`,
      );
    }

    await this.studentService.assignToClass(classroomId, studentId);
  }

  async unassignStudent(classroomId: string, studentId: string) {
    const classroom = await this.getById(classroomId);
    const student = await this.studentService.getById(studentId);

    if (student.classroomId !== classroom.id) {
      throw new ConflictException(
        `Cannot remove student ${studentId} from class ${classroomId} because student is not enrolled to that class.`,
      );
    }

    await this.studentService.unassignFromClassroom(studentId);
  }
}

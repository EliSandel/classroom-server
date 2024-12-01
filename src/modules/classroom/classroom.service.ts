import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Classroom } from './entities/classroom.entity';
import { ClassroomRepository } from './classroom.repository';
import { StudentsService } from '../student/student.service';
import { CreateClassroomDto } from './dto/createClassroom.dto';

@Injectable()
export class ClassroomService {
  constructor(
    private readonly classroomRepository: ClassroomRepository,
    private readonly studentService: StudentsService,
  ) {}

  async addClass(classData: CreateClassroomDto): Promise<Classroom> {
    try {
      const response =
        await this.classroomRepository.createClassroom(classData);
      response.setDataValue('students', []);
      console.log('response ', response);
      return response;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException(
          `Classroom with ID: ${classData.id} already exists.`,
        );
      }
      throw new Error(
        'An unexpected error occurred while adding the classroom.',
      );
    }
  }

  async getAllClasses(): Promise<Classroom[]> {
    return await this.classroomRepository.getAllClassrooms();
  }

  async deleteSpecificClass(classId: string) {
    const classroom = await this.classroomRepository.getClassroomById(classId);
    if (!classroom) {
      throw new NotFoundException(`Classroom ${classId} not found`);
    }
    if ((await this.classroomRepository.getClassOccupancy(classId)) !== 0) {
      throw new BadRequestException(
        'class must be empty in order to delete it',
      );
    }
    return await this.classroomRepository.deleteSpecificClass(classId);
  }

  async getSpecificClass(classId: string): Promise<Classroom> {
    const classroom = await this.classroomRepository.getClassroomById(classId);
    if (!classroom) {
      throw new NotFoundException(`Classroom with id ${classId} not found.`);
    }

    return classroom;
  }

  async addStudentToClass(classroomId: string, studentId: string) {
    const student = await this.studentService.getSpecificStudent(studentId);
    const classroom = await this.getSpecificClass(classroomId);

    if (student.classroomId) {
      throw new ConflictException(
        `Student with id ${studentId} is already assigned to a class.`,
      );
    }

    if (
      (await this.classroomRepository.getClassOccupancy(classroomId)) >=
      classroom.maxOccupancy
    ) {
      throw new ConflictException(
        `Classroom ${classroom.name} is at full occupancy`,
      );
    }

    await this.studentService.addStudentToClass(classroomId, studentId);
  }

  async removeStudentFromClassroom(classroomId: string, studentId: string) {
    const student = await this.studentService.getSpecificStudent(studentId);
    const classroom = await this.getSpecificClass(classroomId);

    if (student.classroomId !== classroom.id) {
      throw new ConflictException(
        `Cannot remove student ${studentId} from class ${classroomId} because student is not enrolled to that class.`,
      );
    }

    await this.studentService.removeStudentFromClassroom(studentId);
  }
}

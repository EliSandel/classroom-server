import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Student } from './entities/student.entity';
import { StudentsRepository } from './student.repository';
import { CreateStudentDto } from './dto/createStudent.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  async create(student: CreateStudentDto): Promise<Student> {
    try {
      return await this.studentsRepository.create(student);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException(
          `Student with ID: ${student.id} already exists.`,
        );
      }
      throw new Error('An unexpected error occurred while adding the student.');
    }
  }

  async getAll(): Promise<Student[]> {
    return await this.studentsRepository.getAll();
  }

  async deleteById(studentId: string) {
    const amountOfStudentsDeleted =
      await this.studentsRepository.deleteById(studentId);
    //!!
    if (amountOfStudentsDeleted === 0) {
      throw new NotFoundException('student ' + studentId + ' doesnt exist');
    }
  }

  async getById(studentId: string): Promise<Student> {
    const student = await this.studentsRepository.getById(studentId);
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    return student;
  }

  async assignToClass(
    classroomId: string,
    studentId: string,
  ): Promise<Student> {
    return await this.studentsRepository.assignToClass(classroomId, studentId);
  }

  async unassignFromClassroom(studentId: string) {
    return await this.studentsRepository.unassignFromClassroom(studentId);
  }
}

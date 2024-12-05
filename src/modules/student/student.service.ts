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

  async addStudent(student: CreateStudentDto): Promise<Student> {
    try {
      return await this.studentsRepository.createStudent(student);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException(
          `Student with ID: ${student.id} already exists.`,
        );
      }
      throw new Error('An unexpected error occurred while adding the student.');
    }
  }

  async getAllStudents(): Promise<Student[]> {
    return await this.studentsRepository.findAllStudents();
  }

  async deleteSpecificStudent(studentId: string) {
    const deletedCount =
      await this.studentsRepository.deleteStudentById(studentId);
    if (deletedCount === 0) {
      throw new NotFoundException('student ' + studentId + ' doesnt exist');
    }
  }

  async getSpecificStudent(studentId: string): Promise<Student> {
    const student = await this.studentsRepository.findStudentById(studentId);
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    return student;
  }

  async addStudentToClass(
    classroomId: string,
    studentId: string,
  ): Promise<Student> {
    return await this.studentsRepository.addStudentToClass(
      classroomId,
      studentId,
    );
  }

  async removeStudentFromClassroom(studentId: string) {
    return await this.studentsRepository.removeStudentFromClassroom(studentId);
  }
}

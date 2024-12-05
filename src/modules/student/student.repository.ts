import { Injectable } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/createStudent.dto';

@Injectable()
export class StudentsRepository {
  async createStudent(student: CreateStudentDto): Promise<Student> {
    return Student.create(student);
  }

  async findAllStudents(): Promise<Student[]> {
    return await Student.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async findStudentById(id: string): Promise<Student | null> {
    return await Student.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async deleteStudentById(studentId: string): Promise<number> {
    return await Student.destroy({ where: { id: studentId } });
  }

  async addStudentToClass(
    classroomId: string,
    studentId: string,
  ): Promise<Student> {
    const [updatedStudents] = await Student.update(
      { classroomId: classroomId },
      { where: { id: studentId }, returning: true },
    );

    return updatedStudents[0];
  }

  async removeStudentFromClassroom(studentId: string) {
    const [updatedStudents] = await Student.update(
      { classroomId: null },
      { where: { id: studentId }, returning: true },
    );

    return updatedStudents[0];
  }
}

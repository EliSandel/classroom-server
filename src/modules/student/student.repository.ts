import { Injectable } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/createStudent.dto';

@Injectable()
export class StudentsRepository {
  async create(student: CreateStudentDto): Promise<Student> {
    return Student.create(student);
  }

  async getAll(): Promise<Student[]> {
    return await Student.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async getById(id: string): Promise<Student | null> {
    return await Student.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async deleteById(studentId: string): Promise<number> {
    return await Student.destroy({ where: { id: studentId } });
  }

  async assignToClass(
    classroomId: string,
    studentId: string,
  ): Promise<Student> {
    const [updatedStudents] = await Student.update(
      { classroomId },
      { where: { id: studentId }, returning: true },
    );

    return updatedStudents[0];
  }

  async unassignFromClassroom(studentId: string) {
    const [updatedStudents] = await Student.update(
      { classroomId: null },
      { where: { id: studentId }, returning: true },
    );

    return updatedStudents[0];
  }
}

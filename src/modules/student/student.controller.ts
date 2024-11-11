import { Student } from './entities/student.entity';
import { StudentsService } from './student.service';
import { CreateStudentDto } from './dto/createStudent.dto';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller("students")
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}


  @Post("addStudent")
  async addStudent(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return await this.studentsService.addStudent(createStudentDto);
  }

  @Get()
  async getAllStudents(): Promise<Student[]> {
    return await this.studentsService.getAllStudents();
  }

  @Delete(':studentId')
  async deleteSpecificStudent(@Param('studentId') studentId: string) {
    await this.studentsService.deleteSpecificStudent(studentId)
    return { message: 'Student with ID: ' + studentId + 'deleted successfully'}
  }
}

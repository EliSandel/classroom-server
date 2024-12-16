import { Student } from './entities/student.entity';
import { StudentsService } from './student.service';
import { CreateStudentDto } from './dto/createStudent.dto';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return await this.studentsService.create(createStudentDto);
  }

  @Get()
  async getAll(): Promise<Student[]> {
    return await this.studentsService.getAll();
  }

  @Delete(':studentId')
  async deleteById(@Param('studentId') studentId: string) {
    await this.studentsService.deleteById(studentId);
    return {
      message: 'Student with ID: ' + studentId + 'deleted successfully',
    };
  }
}

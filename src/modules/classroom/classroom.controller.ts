import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  Controller,
} from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { Classroom } from './entities/classroom.entity';
import { AssignStudentDto } from './dto/assign-student.dto';
import { CreateClassroomDto } from './dto/createClassroom.dto';
import { UnassignStudentDto } from './dto/unassign-student.dto';

@Controller('classrooms')
export class ClassesController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post()
  async create(@Body() createClassDto: CreateClassroomDto): Promise<Classroom> {
    return await this.classroomService.create(createClassDto);
  }

  @Get()
  async getAll(): Promise<Classroom[]> {
    return await this.classroomService.getAll();
  }

  @Delete(':classId')
  async deleteById(@Param('classId') classId: string): Promise<number> {
    return await this.classroomService.deleteById(classId);
  }

  @Patch('assign-student')
  async assignStudent(@Body() assignStudentDto: AssignStudentDto) {
    const { classroomId, studentId } = assignStudentDto;
    return await this.classroomService.assignStudent(classroomId, studentId);
  }

  @Patch('unassign-student')
  async unassignStudent(@Body() unassignStudentDto: UnassignStudentDto) {
    const { classroomId, studentId } = unassignStudentDto;
    return await this.classroomService.unassignStudent(classroomId, studentId);
  }
}

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
import { CreateClassroomDto } from './dto/createClassroom.dto';

@Controller('classrooms')
export class ClassesController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post()
  async create(@Body() createClassDto: CreateClassroomDto): Promise<Classroom> {
    return await this.classroomService.create(createClassDto);
  }

  //explicit return types
  @Get()
  async getAll(): Promise<Classroom[]> {
    return await this.classroomService.getAll();
  }

  @Delete(':classId')
  async deleteById(@Param('classId') classId: string): Promise<number> {
    return await this.classroomService.deleteById(classId);
  }

  @Patch(':classId/addStudent/:studentId') //pass params in body. create dto
  async assignStudent(
    @Param('classId') classId: string,
    @Param('studentId') studentId: string,
  ) {
    return await this.classroomService.assignStudent(classId, studentId);
  }

  @Patch(':classId/removeStudent/:studentId') //pass params in body. create dto
  async unassignStudent(
    @Param('classId') classId: string,
    @Param('studentId') studentId: string,
  ) {
    return await this.classroomService.unassignStudent(classId, studentId);
  }
}

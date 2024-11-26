import { ClassroomService } from './classroom.service';
import { Classroom } from './entities/classroom.entity';
import { CreateClassroomDto } from './dto/createClassroom.dto';
import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';

@Controller('classrooms')
export class ClassesController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post('addClassroom')
  async addClass(
    @Body() createClassDto: CreateClassroomDto,
  ): Promise<Classroom> {
    return await this.classroomService.addClass(createClassDto);
  }

  @Get()
  async getAllClasses(): Promise<Classroom[]> {
    return await this.classroomService.getAllClasses();
  }

  @Delete(':classId')
  async deleteSpecificClass(@Param('classId') classId: string) {
    await this.classroomService.deleteSpecificClass(classId);
    return {
      message: 'classroom with ID: ' + classId + ' was successfilly deleted.',
    };
  }

  @Put(':classId/addStudent/:studentId')
  async addStudentToClass(
    @Param('classId') classId: string,
    @Param('studentId') studentId: string,
  ) {
    await this.classroomService.addStudentToClass(classId, studentId);
  }

  @Put(':classId/removeStudent/:studentId')
  async removeStudentFromClass(
    @Param('classId') classId: string,
    @Param('studentId') studentId: string,
  ) {
    await this.classroomService.removeStudentFromClassroom(classId, studentId);
  }
}

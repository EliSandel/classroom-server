import {
  Get,
  Put,
  Body,
  Post,
  Param,
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
  async addClass(
    @Body() createClassDto: CreateClassroomDto,
  ): Promise<Classroom> {
    return await this.classroomService.addClass(createClassDto);
  }
  //explicit return types
  @Get() //getAll
  async getAllClasses(): Promise<Classroom[]> {
    return await this.classroomService.getAllClasses();
  }

  @Delete(':classId') //unneccessary return
  async deleteSpecificClass(@Param('classId') classId: string) {
    await this.classroomService.deleteSpecificClass(classId);
    return {
      message: 'classroom with ID: ' + classId + ' was successfilly deleted.',
    };
  }

  //patch
  @Put(':classId/addStudent/:studentId') //pass params in body. create dto
  async addStudentToClass(
    @Param('classId') classId: string,
    @Param('studentId') studentId: string,
  ) {
    await this.classroomService.addStudentToClass(classId, studentId);
  }

  @Put(':classId/removeStudent/:studentId') //pass params in body. create dto
  async removeStudentFromClass(
    @Param('classId') classId: string,
    @Param('studentId') studentId: string,
  ) {
    await this.classroomService.removeStudentFromClassroom(classId, studentId);
  }
}

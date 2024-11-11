import { Injectable } from '@nestjs/common';
import { Classroom } from './entities/classroom.entity';
import { Student } from '../student/entities/student.entity';
import { CreateClassroomDto } from './dto/createClassroom.dto';

@Injectable()
export class ClassroomRepository {
  async createClassroom(classroom: CreateClassroomDto): Promise<Classroom> {
    return await Classroom.create(classroom);
  }

  // async getAllClassrooms(): Promise<Classroom[]> {
  //   return await Classroom.findAll();
  // }

  async getAllClassrooms(): Promise<Classroom[]> {
    return await Classroom.findAll({
      include: [
        {
          model: Student,
          required: false
        },
      ],
    });
  }

  async getStudentsInClassroom(classId: string): Promise<Classroom | null> {
    return await Classroom.findOne({
      where: { id: classId },
      include: [Student],
    });
  }

  async getClassroomById(classroomId: string): Promise<Classroom | null> {
    return await Classroom.findByPk(classroomId);
  }

  async deleteSpecificClass(classroomId: string) {
    return await Classroom.destroy({ where: { id: classroomId } });
  }

  async getClassOccupancy(classroomId: string): Promise<number> {
    const occupancy = await Student.count({
      where: { classroomId: classroomId },
    })

    return occupancy;
  }



}

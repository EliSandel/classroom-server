import { Injectable } from '@nestjs/common';
import { Classroom } from './entities/classroom.entity';
import { Student } from '../student/entities/student.entity';
import { CreateClassroomDto } from './dto/createClassroom.dto';

@Injectable()
export class ClassroomRepository {
  async createClassroom(classroom: CreateClassroomDto): Promise<Classroom> {
    return await Classroom.create(classroom);
  }

  async getAllClassrooms(): Promise<Classroom[]> {
    return await Classroom.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Student,
          required: false,
        },
      ],
    });
  }

  async getClassroomById(classroomId: string): Promise<Classroom | null> {
    return await Classroom.findByPk(classroomId, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  }

  async deleteSpecificClass(classroomId: string): Promise<number> {
    return await Classroom.destroy({ where: { id: classroomId } });
  }

  async getClassOccupancy(classroomId: string): Promise<number> {
    const occupancy = await Student.count({
      where: { classroomId: classroomId },
    });

    return occupancy;
  }
}

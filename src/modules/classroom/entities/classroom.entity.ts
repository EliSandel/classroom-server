import {
  Table,
  Column,
  Model,
  HasMany,
  DataType,
  AllowNull,
  PrimaryKey,
} from 'sequelize-typescript';
import { IClassroom } from '../interfaces/classroom.interface';
import { Student } from '../../student/entities/student.entity';

@Table
export class Classroom extends Model<IClassroom> implements IClassroom {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  maxOccupancy: number;

  @HasMany(() => Student)
  students: Student[];
}

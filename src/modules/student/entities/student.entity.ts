import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
  AllowNull,
} from 'sequelize-typescript';
import { IStudent } from '../interfaces/student.interface';
import { Classroom } from '../../classroom/entities/classroom.entity';

@Table
export class Student extends Model<IStudent> implements IStudent {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  firstName: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  lastName: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  age: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  profession: string;

  @AllowNull(true)
  @ForeignKey(() => Classroom)
  @Column(DataType.STRING)
  classroomId: string;

  @BelongsTo(() => Classroom)
  classroom: Classroom;
}

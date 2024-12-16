import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { IStudent } from '../interfaces/student.interface';
import { Classroom } from '../../classroom/entities/classroom.entity';

@Table
export class Student extends Model<IStudent> implements IStudent {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  age: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  profession: string;

  @ForeignKey(() => Classroom)
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  classroomId: string;

  @BelongsTo(() => Classroom)
  classroom: Classroom;
}

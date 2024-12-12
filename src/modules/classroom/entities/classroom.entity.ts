import { Student } from '../../student/entities/student.entity';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

@Table //make interface
export class Classroom extends Model<Classroom> {
  //pk and allow null to @
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  maxOccupancy: number;

  @HasMany(() => Student)
  students: Student[];
}

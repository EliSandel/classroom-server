import { IStudent } from 'src/modules/student/interfaces/student.interface';

export interface IClassroom {
  id: string;
  name: string;
  maxOccupancy: number;
  students?: IStudent[];
}

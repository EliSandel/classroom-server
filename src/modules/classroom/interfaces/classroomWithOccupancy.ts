import { Student } from 'src/modules/student/entities/student.entity';

export interface ClassroomWithOccupancy {
  id: string;
  name: string;
  maxOccupancy: number;
  students: Student[];
  occupancy: number;
  createdAt?: any;
  updatedAt?: any;
}

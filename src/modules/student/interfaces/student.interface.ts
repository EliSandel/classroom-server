export interface IStudent {
  id: string;
  firstName: string;
  lastName: string;
  age?: number;
  profession: string;
  classroomId: string | null;
}

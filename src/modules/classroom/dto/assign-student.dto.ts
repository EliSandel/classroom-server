import { IsNotEmpty, IsString } from 'class-validator';

export class AssignStudentDto {
  @IsNotEmpty()
  @IsString()
  classroomId: string;

  @IsNotEmpty()
  @IsString()
  studentId: string;
}

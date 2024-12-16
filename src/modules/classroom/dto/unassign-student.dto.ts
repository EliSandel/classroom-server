import { IsNotEmpty, IsString } from 'class-validator';

export class UnassignStudentDto {
  @IsNotEmpty()
  @IsString()
  classroomId: string;

  @IsNotEmpty()
  @IsString()
  studentId: string;
}

import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsInt()
  @Min(0)
  age: number;

  @IsNotEmpty()
  @IsString()
  profession: string;

  @IsString()
  @IsOptional()
  classroomId?: string;
}

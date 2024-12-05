import {
  Min,
  IsInt,
  Length,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumberString,
} from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  @Length(9, 9, { message: 'ID must be exactly 9 characters long' })
  @IsNumberString({}, { message: 'ID must contain only digits.' })
  id: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsInt()
  @Min(0, { message: 'Age must be a positive integer.' })
  age: number;

  @IsNotEmpty()
  @IsString()
  profession: string;

  @IsString()
  @IsOptional()
  classroomId?: string;
}

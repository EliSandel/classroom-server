import {
  Min,
  IsInt,
  Length,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumberString,
} from 'class-validator';

//there exists a validation (class validator) for taz
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
  //optional
  @IsInt()
  @Min(0, { message: 'Age must be a positive integer.' })
  age: number;

  @IsNotEmpty()
  @IsString()
  profession: string;

  //dont need this
  @IsString()
  @IsOptional()
  classroomId?: string;
}

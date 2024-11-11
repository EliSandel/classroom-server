import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateClassroomDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  maxOccupancy: number;
}

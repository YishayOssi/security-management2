import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateShiftDto {
  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @IsDateString()
  @IsNotEmpty()
  endTime: string;

  @IsString()
  @IsNotEmpty()
  location: string;
}

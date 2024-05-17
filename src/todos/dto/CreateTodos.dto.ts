import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTodosDto {
  @IsString()
  @IsNotEmpty()
  task: string;

  @IsString()
  @IsNotEmpty()
  userId: string
}

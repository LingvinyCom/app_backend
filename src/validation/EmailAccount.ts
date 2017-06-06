import { IsEmail, IsNotEmpty, MinLength, IsString, IsNumber, ValidateIf, Min } from 'class-validator';
import { Engine } from './Engine';

export class EmailAccount {

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  public password: string;

  @IsNumber()
  @Min(1)
  public engine_id: number;

  public new_engine: Engine;
}

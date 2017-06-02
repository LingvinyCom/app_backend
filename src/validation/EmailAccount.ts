import { IsEmail, IsNotEmpty, MinLength, IsString, IsNumber } from 'class-validator';

export class EmailAccount {

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  public password: string;

  @IsNotEmpty()
  @IsNumber()
  public engine_id: number;
}

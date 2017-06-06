import { IsEmail, IsNotEmpty, MinLength, IsString, ValidateIf, IsNumber } from 'class-validator';
import { Engine } from "./Engine";

export class Client {
  
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @MinLength(6)
  public password: string;

  @ValidateIf(v => !!v.first_name)
  @IsString()
  @MinLength(2)
  public first_name: string;

  @ValidateIf(v => !!v.last_name)
  @IsString()
  @MinLength(2)
  public last_name: string;

  @IsNumber()
  public engine_id: number;

  public new_engine: Engine;
}

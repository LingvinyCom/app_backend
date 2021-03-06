import { IsEmail, IsNotEmpty, MinLength, IsString, ValidateIf, IsNumber, Min } from 'class-validator';
import { isNullOrUndefined } from 'util';

import { Engine } from './Engine';
import { IsEmailUnique, IsObjectNotEmpty } from "../utils/CustomValidators";

export class Client {
  
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsEmailUnique({ message: 'Email is already registered' })
  public email: string;

  @IsNotEmpty()
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

  @ValidateIf(v => !v.new_engine)
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  public engine_id: number;

  @ValidateIf(v => isNullOrUndefined(v.engine_id) && !!v.new_engine)
  @IsNotEmpty({ message: 'Wrong new engine data' })
  @IsObjectNotEmpty({ message: 'Wrong new engine data' })
  public new_engine: Engine;

}

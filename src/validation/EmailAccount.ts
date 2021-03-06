import { IsEmail, IsNotEmpty, MinLength, IsString, IsNumber, ValidateIf, Min } from 'class-validator';
import { isNullOrUndefined } from 'util';

import { Engine } from './Engine';
import { IsEmailUnique, IsObjectNotEmpty } from "../utils/CustomValidators";

export class EmailAccount {

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsEmailUnique({ message: 'Email is already registered' })
  public email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  public password: string;

  @ValidateIf(v => !v.new_engine)
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  public engine_id: number;

  @ValidateIf(v => isNullOrUndefined(v.engine_id))
  @IsNotEmpty({ message: 'Wrong new engine data' })
  @IsObjectNotEmpty({ message: 'Wrong new engine data' })
  public new_engine: Engine;
}

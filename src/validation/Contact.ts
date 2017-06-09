import { IsNotEmpty, IsString, IsNumber, IsBoolean, ValidateIf } from 'class-validator';
import { IsUserExists } from "../utils/CustomValidators";

export class Contact {

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsNumber()
  @IsUserExists({ message: 'Wrong user ID' })
  public user_id: number;

}

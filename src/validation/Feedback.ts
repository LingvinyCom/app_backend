import { IsNotEmpty, IsString, IsNumber, IsBoolean, ValidateIf } from 'class-validator';
import { IsUserExists } from "../utils/CustomValidators";

export class Feedback {

  @IsNotEmpty()
  @IsNumber()
  @IsUserExists({ message: 'Wrong user ID' })
  public user_id: number;

  @IsNotEmpty()
  public text: string;

}

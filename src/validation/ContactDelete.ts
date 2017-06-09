import { IsNotEmpty, IsNumber } from 'class-validator';
import { IsContactExists, IsUserExists } from "../utils/CustomValidators";

export class ContactDelete {

  @IsNotEmpty()
  @IsNumber()
  @IsUserExists({ message: 'Wrong user ID' })
  public user_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsContactExists({ message: 'Wrong contact ID' })
  public contact_id: number;

}

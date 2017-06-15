import { IsNotEmpty, IsNumber } from 'class-validator';
import { IsContactExists } from "../utils/CustomValidators";

export class ContactDelete {

  @IsNotEmpty()
  @IsNumber()
  @IsContactExists({ message: 'Wrong contact ID' })
  public contact_id: number;
}

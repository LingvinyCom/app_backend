import { IsNotEmpty, IsArray, IsNumber, ArrayNotEmpty } from 'class-validator';
import { IsUserExists } from "../utils/CustomValidators";
import { Contact } from "./Contact";

export class ContactCreate {

    @IsArray()
    @ArrayNotEmpty()
    public contacts: Contact[];

    @IsNotEmpty()
    @IsNumber()
    @IsUserExists({ message: 'Wrong user ID' })
    public user_id: number;
}

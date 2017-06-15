import { IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';
import { Contact } from "./Contact";

export class ContactCreate {

    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    public contacts: Contact[];
}

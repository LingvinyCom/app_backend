import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class Contact {

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

}

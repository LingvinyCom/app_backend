import { IsEmail, IsNotEmpty } from 'class-validator';

export class Login {

  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public password: string;
}

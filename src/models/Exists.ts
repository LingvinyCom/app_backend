import { IsEmail } from 'class-validator';

export class Exists {

  @IsEmail()
  public email: string;
}

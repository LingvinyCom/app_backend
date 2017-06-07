import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  ValidateIf,
  IsNumber
} from 'class-validator';

export class ClientUpdate {

  @ValidateIf(v => !!v.email)
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ValidateIf(v => !!v.password)
  @IsString()
  @MinLength(6)
  public password: string;

  @ValidateIf(v => !!v.first_name)
  @IsString()
  @MinLength(2)
  public first_name: string;

  @ValidateIf(v => !!v.last_name)
  @IsString()
  @MinLength(2)
  public last_name: string;

}

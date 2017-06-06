import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class Engine {
  @IsString()
  public host: string;

  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsNumber()
  public server_port: number;

  @IsString()
  public authentication_type: string;

  @IsBoolean()
  public is_ssl: boolean;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class Signature {

  @IsNotEmpty()
  @IsString()
  public text: string;
}

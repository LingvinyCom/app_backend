import { IsNotEmpty } from 'class-validator';

export class Feedback {

  @IsNotEmpty()
  public text: string;

}

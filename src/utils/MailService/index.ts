import { Engine } from "../../models/Engine";
import cred from './credentials';

export class MailService {

  public engine: Engine;

  constructor(engine: Engine){
    this.engine = engine;
    console.log(engine);
  }

  test(){
    return cred;
  }

  list() {

  }
}

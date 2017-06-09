import { Engine } from "../../models/Engine";
import Credentials from './credentials';
import { EmailServiceCredentials } from '../../types';
export class MailService {

  public engine: Engine;
  public credentials: EmailServiceCredentials;

  constructor(engine: Engine){
    this.engine = engine;
    this.credentials = Credentials[engine.title];
    
  }

  test(){
    console.log(this.credentials);
    return this.credentials;
  }

  list() {

  }
}

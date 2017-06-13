import { AxiosInstance } from 'axios';
import { Connection, Repository } from 'typeorm';
import { InjectRequest, InjectConnection, InjectRepositories } from './../utils';
import { User, EmailAccount, Engine, Contact, Signature } from "../models";

/**
 * @TODO: Use one of:
 * - https://github.com/pleerock/typedi
 * - https://github.com/inversify/InversifyJS/ 
 * to manage all dependencies.
 */
@InjectRequest
@InjectConnection
@InjectRepositories
export class BaseController {
  public request: AxiosInstance;
  public connection: Connection;
  public userRepository: Repository<User>;
  public emailAccountRepository: Repository<EmailAccount>;
  public engineRepository: Repository<Engine>;
  public contactRepository: Repository<Contact>;
  public signatureRepository: Repository<Signature>;
}

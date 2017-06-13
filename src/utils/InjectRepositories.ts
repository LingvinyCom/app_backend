import { DataProvider } from './DataProvider';
import { User, Engine, EmailAccount, Contact, Signature } from '../models';

export function InjectRepositories<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    userRepository = DataProvider.connection.getRepository(User);
    emailAccountRepository = DataProvider.connection.getRepository(EmailAccount);
    engineRepository = DataProvider.connection.getRepository(Engine);
    contactRepository = DataProvider.connection.getRepository(Contact);
    signatureRepository = DataProvider.connection.getRepository(Signature);
  }
}

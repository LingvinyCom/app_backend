import { AxiosInstance } from 'axios';
import { Connection } from 'typeorm';
import { InjectRequest, InjectConnection } from './../utils';

/**
 * @TODO: Use one of:
 * - https://github.com/pleerock/typedi
 * - https://github.com/inversify/InversifyJS/ 
 * to manage all dependencies.
 */
@InjectRequest
@InjectConnection
export class BaseController {
  public request: AxiosInstance;
  public connection: Connection;
}

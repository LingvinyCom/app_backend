import { AxiosInstance } from 'axios';
import { InjectRequest } from './../utils';

/**
 * @TODO: Use one of:
 * - https://github.com/pleerock/typedi
 * - https://github.com/inversify/InversifyJS/ 
 * to manage all dependencies.
 */
@InjectRequest
export class BaseController {
  public request: AxiosInstance;
}
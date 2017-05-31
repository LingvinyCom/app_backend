import { AxiosInstance } from 'axios';
import { InjectRequest } from './../utils';

@InjectRequest
export class BaseController {
  public request: AxiosInstance;
}
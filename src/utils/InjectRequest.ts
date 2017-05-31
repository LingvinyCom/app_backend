import { request } from './';

export function InjectRequest<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    request = request;
  }
}
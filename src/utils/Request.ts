import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { badRequest, badImplementation, unauthorized } from 'boom';
import { BASE_API_URL, BASE_API_KEY } from './../config';

const request = axios.create({
  baseURL: BASE_API_URL
});

request.interceptors.request.use((request: AxiosRequestConfig): AxiosRequestConfig => {
  const { method, url, params } = request;
  request.params = {
    ...params,
    _api_key: BASE_API_KEY
  };
  console.log('Sending %s request to: %s\nWith params: %s', method, url, JSON.stringify(request.params));
  return request;
});

request.interceptors.response.use((r: any): AxiosPromise => {
  const { data, data: { _code, _msg } } = r;

  if (_code !== 200) console.log('Request error: %s', JSON.stringify(r.data));

  switch (_code) {
    case 500:
      return Promise.reject(badRequest(_msg));
    case 400:
      return Promise.reject(badImplementation());
    case 401:
      return Promise.reject(unauthorized(_msg));
  }
  return Promise.resolve(r.data);
}, (r: any): AxiosPromise => {
  return Promise.reject(badImplementation());
});

export { request };

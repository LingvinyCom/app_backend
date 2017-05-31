import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { BASE_API_URL, BASE_API_KEY } from './../config';

const request = axios.create({
  baseURL: BASE_API_URL
});

request.interceptors.request.use((request: AxiosRequestConfig): AxiosRequestConfig => {
  request.params = {
    ...request.params,
    _api_key: BASE_API_KEY
  };
  console.log('Sending request to: %s\nWith params: %s', request.url, JSON.stringify(request.params));
  return request;
});

request.interceptors.response.use((r: any): AxiosPromise =>
  Promise.resolve(r.data));

export { request };
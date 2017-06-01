import { Action } from 'routing-controllers';
import { request } from './../utils';

export async function AuthorizationChecker(action: Action) {
  try {
    const _lingviny_token = action.request.headers['authorization'];
    await request.get('/auth/check', { params: { _lingviny_token } });
    return true;
  } catch (e) {
    return false;
  }
}

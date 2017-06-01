import { createParamDecorator, Action } from 'routing-controllers';

export function InjectToken(options?: { required?: boolean }) {
  return createParamDecorator({
    required: options && options.required ? true : false,
    value: async (action: Action) => {
      return action.request.headers["authorization"];
    }
  })
};

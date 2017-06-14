import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments } from 'class-validator';

import { DataProvider } from './DataProvider';
import { EmailAccount, Contact } from '../models';

@ValidatorConstraint()
export class IsObjectNotEmptyConstraint implements ValidatorConstraintInterface {

  validate(object: Object, args: ValidationArguments) {
    return !!Object.keys(object).length;
  }

}

@ValidatorConstraint()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {

  validate(email: string, args: ValidationArguments) {
    return DataProvider.connection.getRepository(EmailAccount).findOne({ email }).then(acc => !acc);
  }

}

@ValidatorConstraint()
export class IsContactExistsConstraint implements ValidatorConstraintInterface {

  validate(id: number, args: ValidationArguments) {
    return DataProvider.connection.getRepository(Contact).findOneById(id).then(acc => !!acc);
  }

}

export function IsObjectNotEmpty(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsObjectNotEmptyConstraint
    });
  };
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueConstraint
    });
  };
}

export function IsContactExists(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsContactExistsConstraint
    });
  };
}

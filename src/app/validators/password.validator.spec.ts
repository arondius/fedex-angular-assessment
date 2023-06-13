import { FormControl } from '@angular/forms';
import { passwordValidator } from './password.validator';

describe('PasswordValidator', () => {
  it('should return null if password is valid', () => {
    const control = new FormControl('ValidPassword1');
    const validator = passwordValidator('John', 'Doe');
    expect(validator(control)).toBeNull();
  });

  it('should return error object if password does not contain a number', () => {
    const control = new FormControl('InvalidPassword');
    const validator = passwordValidator('John', 'Doe');
    expect(validator(control)).toEqual({ invalidPassword: true });
  });

  it('should return error object if password does not contain a capital letter', () => {
    const control = new FormControl('invalidpassword1');
    const validator = passwordValidator('John', 'Doe');
    expect(validator(control)).toEqual({ invalidPassword: true });
  });

  it('should return error object if password does not contain a small case letter', () => {
    const control = new FormControl('INVALIDPASSWORD1');
    const validator = passwordValidator('John', 'Doe');
    expect(validator(control)).toEqual({ invalidPassword: true });
  });

  it('should return error object if password is shorter than 8 characters', () => {
    const control = new FormControl('Pass1');
    const validator = passwordValidator('John', 'Doe');
    expect(validator(control)).toEqual({ invalidPassword: true });
  });

  it('should return error object if password contains first name', () => {
    const control = new FormControl('JohnPassword1');
    const validator = passwordValidator('John', 'Doe');
    expect(validator(control)).toEqual({ invalidPassword: true });
  });

  it('should return error object if password contains last name', () => {
    const control = new FormControl('DoePassword1');
    const validator = passwordValidator('John', 'Doe');
    expect(validator(control)).toEqual({ invalidPassword: true });
  });
});

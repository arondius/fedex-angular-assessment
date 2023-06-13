import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(firstName: string | null, lastName: string | null): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const hasNumber = /[0-9]/.test(value);
    const hasCapitalCase = /[A-Z]/.test(value);
    const hasSmallCase = /[a-z]/.test(value);
    const hasFirstName = !!firstName && value?.toLowerCase().includes(firstName.toLowerCase());
    const hasLastName = !!lastName && value?.toLowerCase().includes(lastName.toLowerCase());
    const valid = hasNumber && hasCapitalCase && hasSmallCase && value.length >= 8 && !hasFirstName && !hasLastName;
    if (!valid) {
      return { invalidPassword: true };
    }
    return null;
  };
}
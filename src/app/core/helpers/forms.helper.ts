import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class PasswordStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!control?.invalid && control.touched;
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty && control.touched);
    return invalidCtrl || invalidParent;
  }
}

export function checkPasswords(group: FormGroup): { notSame: boolean } | null {
  const password = group.get('password').value;
  const confirmPassword = group.get('confirmPassword').value;

  return password === confirmPassword ? null : {notSame: true};
}

import { UserService } from './../services/api/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordValidator } from '../validators/password.validator';
import { mapUserModelToDto } from '../services/api/user.mapper';
import { map, of } from 'rxjs';
import { IUserResponse } from '../services/api/user.model';
import { IFormStatus } from './signup-form.models';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  signUpForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: this.fb.control('', [Validators.required, passwordValidator('firstName', 'lastName')]),
  });

  formStatus: IFormStatus = 'idle';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private UserService: UserService,

  ) { }

  ngOnInit(): void {
    this.signUpForm.valueChanges.subscribe(() => {
      this.signUpForm.controls.password.setValidators([
        Validators.required,
        passwordValidator(this.signUpForm.controls.firstName.value, this.signUpForm.controls.lastName.value)
      ]);
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.UserService.postUser(mapUserModelToDto(this.signUpForm.value))
        .subscribe(
          () => this.formStatus = 'success',
          error => {
            this.formStatus = 'error';
            this.errorMessage = error.error.message;
          });
    }
  }

  onResetForm(): void {
    this.signUpForm.reset();
    this.formStatus = 'idle';
  }

}
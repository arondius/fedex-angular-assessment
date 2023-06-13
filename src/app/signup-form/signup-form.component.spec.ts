import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupFormComponent } from './signup-form.component';
import { UserService } from '../services/api/user.service';
import { of, throwError } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let userApiService: UserService;

  beforeEach(async(() => {
    const userApiServiceMock = {
      postUser: jasmine.createSpy('postUser').and.returnValue(of({}))
    };

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatInputModule,
      ],
      declarations: [SignupFormComponent],
      providers: [
        { provide: UserService, useValue: userApiServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    userApiService = TestBed.inject(UserService);
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty fields', () => {
    const signUpForm = component.signUpForm;
    expect(signUpForm.get('firstName')?.value).toBe('');
    expect(signUpForm.get('lastName')?.value).toBe('');
    expect(signUpForm.get('email')?.value).toBe('');
    expect(signUpForm.get('password')?.value).toBe('');
  });

  it('should call UserApiService on valid form submit', () => {
    component.signUpForm.patchValue({
      firstName: 'asdf',
      lastName: 'kjhkh',
      email: 'test.user@example.com',
      password: 'TestUser123'
    });
    component.onSubmit();
    expect(userApiService.postUser).toHaveBeenCalled();
  });

  it('should not call UserApiService on invalid form submit', () => {
    component.onSubmit();
    expect(userApiService.postUser).not.toHaveBeenCalled();
  });

  it('should call UserService and set formStatus to error on invalid form submit', () => {
    const mockError = { error: { message: 'Test Error' } };

    userApiService.postUser = jasmine.createSpy().and.returnValue(throwError(mockError));

    component.signUpForm.patchValue({
      firstName: 'Test',
      lastName: 'User',
      email: 'test.user@example.com',
      password: 'TestUser123'
    });

    component.onSubmit();

    expect(userApiService.postUser).toHaveBeenCalled();
    expect(component.formStatus).toBe('error');
    expect(component.errorMessage).toBe('Test Error');
  });

  it('should not call UserService on submit if form is invalid', () => {
    component.signUpForm.patchValue({
      firstName: 'Test',
      lastName: 'User',
      email: 'invalid email', // Invalid email
      password: 'TestUser123'
    });

    component.onSubmit();

    expect(userApiService.postUser).not.toHaveBeenCalled();
  });

  it('should reset form and set formStatus to idle on reset', () => {
    component.onResetForm();

    expect(component.signUpForm.pristine).toBeTruthy();
    expect(component.formStatus).toBe('idle');
  });
});

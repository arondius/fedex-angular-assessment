import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { IUserRequest, IUserResponse } from './user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  describe('postUser', () => {
    it('should make a POST request and return the response', () => {
      const mockUser: IUserRequest = { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'password' };
      const mockResponse: IUserResponse = { _id: '123', ...mockUser };

      service.postUser(mockUser).subscribe(
        response => expect(response).toEqual(mockResponse),
        fail
      );

      const req = httpMock.expectOne(service.url);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });
  describe('handleError', () => {
    it('should handle client-side or network errors', () => {
      const mockUser: IUserRequest = { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'password' };
      const mockError = new ErrorEvent('Network error', { message: 'Network is down' });

      spyOn(console, 'error');

      service.postUser(mockUser).subscribe(
        () => fail('should have returned an error'),
        error => expect(error.message).toBe('Something bad happened; please try again later.')
      );

      const req: TestRequest = httpMock.expectOne(service.url);
      req.error(mockError);

      expect(console.error).toHaveBeenCalledWith('An error occurred:', mockError);
    });

    it('should handle server errors', () => {
      const mockUser: IUserRequest = { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'password' };
      const mockError = { status: 500, statusText: 'Server Error' };

      spyOn(console, 'error');

      service.postUser(mockUser).subscribe(
        () => fail('should have returned an error'),
        error => expect(error.message).toBe('Something bad happened; please try again later.')
      );

      const req: TestRequest = httpMock.expectOne(service.url);
      req.flush(null, mockError);

      expect(console.error).toHaveBeenCalledWith(`Backend returned code ${mockError.status}, body was: `, null);
    });
  });
});

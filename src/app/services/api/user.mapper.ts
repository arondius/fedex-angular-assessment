import { IUserRequest } from './user.model';

export function mapUserModelToDto(user: any): IUserRequest {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password
  };
}
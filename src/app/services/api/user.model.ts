export interface IUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}
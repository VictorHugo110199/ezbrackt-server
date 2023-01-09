export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  photo?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

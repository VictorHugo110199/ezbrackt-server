export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  photo?: string;
}

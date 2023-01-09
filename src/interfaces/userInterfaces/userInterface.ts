export interface IUser {
  name: string;
  email: string;
  isActive?: boolean;
  photo?: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
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

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
}

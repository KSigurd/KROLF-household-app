export interface User {
  id: string;
  email: string;
  password: string;
}

export interface UserOmit extends Omit<User, "id">{};

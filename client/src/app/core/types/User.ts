export interface User {
  username: string;
  password: string;
  confirmPassword?: string;
  id?: string;
  token?: string;
  role?: string;
}

export interface UserReqRes {
  user: User;
}

export interface User {
  user: {
    username: string;
    password: string;
    confirmPassword?: string;
    id?: string;
    token?: string;
  };
}

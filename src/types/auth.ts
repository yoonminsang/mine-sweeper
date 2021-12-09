export interface IUser {
  id: string;
  email: string;
  nickname: string;
}

export interface ILogUser extends IUser {
  accessToken: string;
}

export interface IToken {
  expiresIn: string;
  Authorization: string;
}
export interface ILoginStatus {
  success: boolean;
  message: string;
  id?: number;
  email?: string;
  token?: IToken;
}

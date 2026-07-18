export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "TUTOR" | "ADMIN";
  isVerified: boolean;
  isBlocked: boolean;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
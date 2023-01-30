import type { IUser } from "../IUser";
export interface UserResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

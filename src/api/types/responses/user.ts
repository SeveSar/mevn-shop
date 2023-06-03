import type { IUser } from "@/models/IUser";
export interface UserResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

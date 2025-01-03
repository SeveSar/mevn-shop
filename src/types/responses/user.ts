import type { IUser } from '@/types/IUser';

export interface UserResponse {
  success: boolean
  accessToken: string
  user: IUser
}

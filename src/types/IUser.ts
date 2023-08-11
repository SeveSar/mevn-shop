export interface IUser {
  _id: string;
  email: string;
  diskSpace: number;
  usedSpace: number;
  avatar: string | null;
}

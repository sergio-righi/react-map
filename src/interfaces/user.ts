
export interface IUser {
  userId: string;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  token: string;
  active: boolean;
  // TODO : it should be removed later
  password: string;
}

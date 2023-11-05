import { Auxiliars } from "helpers";
import { Enums } from "utils";
import { Users } from "assets/data";
import { IUser } from "interfaces";
import { ApiResponse } from "types";

export interface IAuthData {
  register(data: { companyName: string, email: string, password: string, calendarId: string }): Promise<ApiResponse<number>>;
  login(email: string, password: string): Promise<ApiResponse<IUser>>;
  logout(): Promise<ApiResponse<boolean>>;
  accountConfirmation(email: string, code: string): Promise<ApiResponse<boolean>>;
  resendConfirmationEmail(email: string): Promise<ApiResponse<boolean>>;
  forgotPassword(email: string): Promise<ApiResponse<boolean>>;
  resetPassword(id: string, password: string): Promise<ApiResponse<boolean>>;
}

export class AuthData implements IAuthData {

  async register(data: { companyName: string, email: string, password: string, calendarId: string }) {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success, payload: 1
    }));
  }

  async login(email: string, password: string) {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success, payload: Users.filter((item: IUser) => item.email === email && item.password === password)[0]
    }));
  }

  async logout() {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success, payload: true
    }));
  }

  async accountConfirmation(email: string, code: string) {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success, payload: true
    }));
  }

  async resendConfirmationEmail(email: string) {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success, payload: true
    }));
  }

  async forgotPassword(email: string) {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success, payload: true
    }));
  }

  async resetPassword(id: string, password: string) {
    return await Auxiliars.asyncMethod(() => ({
      status: Enums.EnumResponse.Success, payload: true
    }));
  }
}
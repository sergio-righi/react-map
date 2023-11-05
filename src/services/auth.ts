import { AuthData, IAuthData } from "data";
import { IUser } from "interfaces";
import { ApiResponse } from "types";

export interface IAuthService {
  register(data: { companyName: string, email: string, password: string, calendarId: string }): Promise<ApiResponse<number>>;
  login(email: string, password: string): Promise<ApiResponse<IUser>>;
  logout(): Promise<ApiResponse<boolean>>;
  accountConfirmation(email: string, code: string): Promise<ApiResponse<boolean>>;
  resendConfirmationEmail(email: string): Promise<ApiResponse<boolean>>;
  forgotPassword(email: string): Promise<ApiResponse<boolean>>;
  resetPassword(id: string, password: string): Promise<ApiResponse<boolean>>;
}

export class AuthService implements IAuthService {
  authData: IAuthData;

  constructor() {
    this.authData = new AuthData();
  }

  /**
   * register a new user
   * @param {{ companyName: string, email: string, password: string, calendarId: string }} data
   * @return
   */

  async register(data: { companyName: string, email: string, password: string, calendarId: string }) {
    return await this.authData.register(data);
  }

  /**
   * check user's credentials
   * @param {string} email email
   * @param {string} password password
   * @return
   */

  async login(email: string, password: string) {
    return await this.authData.login(email, password);
  }

  /**
   * logout the user
   * @return
   */

  async logout() {
    return await this.authData.logout();
  }

  /**
   * confirm the user's account
   * @param {string} email email to be tested
   * @param {string} code code to be confirmed
   * @return
   */

  async accountConfirmation(email: string, code: string) {
    return await this.authData.accountConfirmation(email, code);
  }

  /**
   * resend the account confirmation email
   * @param {string} email email
   * @return
   */

  async resendConfirmationEmail(email: string) {
    return await this.authData.resendConfirmationEmail(email);
  }

  /**
   * request a password reset
   * @param {string} email email
   * @return
   */

  async forgotPassword(email: string) {
    return await this.authData.forgotPassword(email);
  }

  /**
   * update user's password
   * @param {string} id user id
   * @param {string} password new password
   * @return
   */

  async resetPassword(id: string, password: string) {
    return await this.authData.resetPassword(id, password);
  }
}
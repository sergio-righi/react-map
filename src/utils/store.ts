const sessionStorage = {

  /** 
   * function to return the session object
   * @returns {any} either IUser or {}
   */

  get: (): any => {
    return window.sessionStorage.map ? JSON.parse(window.sessionStorage.map) : {};
  },

  /** 
   * function to set the user session
   * @param {object} values the data to be stored
   */

  set: (values: object): void => {
    window.sessionStorage.map = Object.keys(values).length === 0 ? "" : JSON.stringify({ ...sessionStorage.get(), ...values })
  },

  /** 
   * function to clear the user session
   */

  clear: (): void => {
    window.sessionStorage.map = "";
  },

  /** 
   * function to return the access token
   * @returns {string} the access token or an empty string
   */

  accessToken: (): string => {
    return sessionStorage.get()?.tk ?? ""
  }
}

export {
  sessionStorage
}
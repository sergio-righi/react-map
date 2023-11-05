import axios from 'axios';
import { Combines } from 'helpers';

/**
 * responsible for creating the instance of axios in order to make requests to Google Calendar API
 */

const calendar = (baseUrl: string, token: string, params: object = {}) => axios.create({
  baseURL: Combines.interpolate(baseUrl, params),
  headers: {
    common: {
      'Authorization': `Bearer ${token}`
    }
  }
});

export {
  calendar
}
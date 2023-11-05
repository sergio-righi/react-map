import en from "assets/locales/en.json";
import { Enums } from "utils";

export const LOCALE = {
  EN: "EN"
};

export const LOCALE_STRINGS = {
  [LOCALE.EN]: en
};

export const COUNTRY_CONSTANTS = {
  [LOCALE.EN]: {
    phoneCode: "+1"
  }
};

export const DATE_FORMAT = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
} as any;

export const TIME_FORMAT = {
  hour: "2-digit",
  minute: "2-digit",
} as any;

export const INPUT_MASK = {
  DATE: "9999-99-99",
  PHONE: "(999) 999-9999"
}

export const STRING_FORMAT = {
  DATE: "yyyy-MM-dd"
}

export const CURRENCY = {
  USD: "USD"
}

export const TEXTAREA = {
  MAX: 5,
  MIN: 3
};

export const PAGE_SIZE = {
  DATA_GRID: 25,
}

export const KEY_CODE = {
  ENTER: "Enter",
  ESC: "Escape",
  TAB: "Tab",
}

export const MAX_INTEGER = 2147483647;
export const MIN_DATE = "1900-01-01";

export const MAPBOX = {
  API_KEY: String(process.env.REACT_APP_MAPBOX_API_KEY).trim(),
  MIN_ZOOM: 0,
  MAX_ZOOM: 21,
  ZOOM: 17,
  LATITUDE: 43.6547562,
  LONGITUDE: -79.3997669,
}

export const REFRESH_RATE = {
  ALERT: 5000,
  OVERLAP_MESSAGE: 3000,
  TRANSITION_MESSAGE: 500,
  PLACEHOLDER_THRESHOLD: 10000,
}
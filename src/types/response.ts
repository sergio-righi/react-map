import { Enums } from "utils";

export type ApiResponse<T> = {
  payload: T;
  status: Enums.EnumResponse;
}

enum EnumTheme {
  Light = 1,
  Dark = 2,
}

enum EnumUser {
  Admin = "Admin"
}

enum EnumFeedback {
  Success = "success",
  Error = "error",
  Info = "info"
}

enum EnumValidation {
  Required = "required",
  IsGraterThan = "isGraterThan",
  IsLessThan = "isLessThan",
  IsEquals = "isEquals",
  MinLength = "minLength",
  Function = "function",
  Regex = "regex"
}

enum EnumResponse {
  Success = 200,
  Error = 500,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  None = 0,
}

enum EnumMenu {
  Map = 2,
  Search = 3,
  SavedList = 4,
}

enum EnumMapboxLayer {
  Street = 1,
  Satellite = 2,
}

enum EnumMapboxType {
  All = "country,region,postcode,locality,neighborhood,address",
  Address = "address",
}

enum EnumMarkerContextMenu {
  View = 1,
  Generate = 2,
  Edit = 3,
}

enum EnumDayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export {
  EnumMenu,
  EnumUser,
  EnumTheme,
  EnumResponse,
  EnumFeedback,
  EnumDayOfWeek,
  EnumValidation,
  EnumMapboxType,
  EnumMapboxLayer,
  EnumMarkerContextMenu,
}
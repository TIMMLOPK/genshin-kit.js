export enum APIError {
  INVALID_COOKIES = "The provided cookies are invalid or expired",
  COOKIE_LIMIT = "Cannot get data for more than 30 accounts per cookie per day. Please use a different cookie.",
  API_BUSY = "API system busy. Please try again later.",
  ACCOUNT_NOT_FOUND = "The account is not found",
  CODE_IS_USED = "The code has been used",
}

export interface HoYoLabError {
  retcode: number;
  message: APIError;
  description?: string;
}

const ERRORS = [
  { retcode: -100, message: APIError.INVALID_COOKIES },
  { retcode: 10001, message: APIError.INVALID_COOKIES },
  {
    retcode: 10101,
    message: APIError.COOKIE_LIMIT,
  },
  {
    retcode: -1048,
    message: APIError.API_BUSY,
  },
  {
    retcode: 1009,
    message: APIError.ACCOUNT_NOT_FOUND,
  },
  {
    retcode: -2017,
    message: APIError.CODE_IS_USED,
  },
  {
    retcode: -1071,
    message: APIError.INVALID_COOKIES,
  },
];

export function getErrorByRetcode(retcode: number): string | undefined {
  return ERRORS.find(error => error.retcode === retcode)?.message;
}

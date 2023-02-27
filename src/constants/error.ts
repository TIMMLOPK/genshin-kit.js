export enum APIError {
  INVALID_COOKIE = "The provided cookie is invalid or expired",
  COOKIE_LIMIT = "Cannot get data for more than 30 accounts per cookie per day. Please use a different cookie.",
  API_BUSY = "API system busy. Please try again later.",
  ACCOUNT_NOT_FOUND = "The account is not found",
}

interface Error {
  retcode: number;
  message: APIError;
}

export type HoYoLabError = Error;

const ERROR = [
  { retcode: -100, message: APIError.INVALID_COOKIE },
  { retcode: 10001, message: APIError.INVALID_COOKIE },
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
];

export function getErrorByRetcode(retcode: number): string | undefined {
  return ERROR.find(error => error.retcode === retcode)?.message;
}

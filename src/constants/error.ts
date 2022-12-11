export enum APIError {
  INVALID_COOKIE = "The provided cookie is invalid or expired",
  COOKIE_LIMIT = "Cannot get data for more than 30 accounts per cookie per day. Please use a different cookie.",
  API_BUSY = "API system busy. Please try again later.",
  ACCOUNT_NOT_FOUND = "The account is not found",
}

const ERROR = [
  { retcode: -100, message: "The provided cookie is invalid or expired" },
  { retcode: 10001, message: "The provided cookie is invalid or expired" },
  {
    retcode: 10101,
    message: "Cannot get data for more than 30 accounts per cookie per day. Please use a different cookie.",
  },
  {
    retcode: -1048,
    message: "API system busy. Please try again later.",
  },
  {
    retcode: 1009,
    message: "The account is not found",
  },
];

export function getErrorByRetcode(retcode: number): string | undefined {
  return ERROR.find(error => error.retcode === retcode)?.message;
}

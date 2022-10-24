const ERROR = [
  { retcode: -100, message: "Invalid cookie" },
  { retcode: 10001, message: "Invalid cookie" },
  {
    retcode: 10101,
    message: "Cannot get data for more than 30 accounts per cookie per day",
  },
];

function getErrorByRetcode(retcode: number): string | undefined {
  return ERROR.find((error) => error.retcode === retcode)?.message;
}

export default getErrorByRetcode;

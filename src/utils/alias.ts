export const alias = (obj: any, alias: any) => {
  Object.keys(alias).forEach((key) => {
    if (obj[key]) {
      obj[alias[key]] = obj[key];
      delete obj[key];
    }
  });
  return obj;
};

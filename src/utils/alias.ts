export const alias = (obj: any, alias: any) => {
  Object.keys(alias).forEach((key) => {
    if (obj[key]) {
      obj[alias[key]] = obj[key];
      delete obj[key];
    }
  });
  return obj;
};

export const removeUndefined = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
};

export const removeFromObject = (obj: any, keys: string[]) => {
  keys.forEach((key) => {
    delete obj[key];
  });
  return obj;
};

export const removeFromArrayObject = (arr: any[], keys: string[]) => {
  arr.forEach((obj) => {
    keys.forEach((key) => {
      delete obj[key];
    });
  });
  return arr;
};

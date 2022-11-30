export function alias(obj: any, alias: any) {
  Object.keys(alias).forEach(key => {
    if (obj[key]) {
      obj[alias[key]] = obj[key];
      delete obj[key];
    }
  });
  return obj;
}

export function removeFromObject(obj: any, keys: string[]) {
  keys.forEach(key => {
    delete obj[key];
  });
  return obj;
}

export function removeFromArrayObject(arr: any[], keys: string[]) {
  arr.forEach(obj => {
    keys.forEach(key => {
      delete obj[key];
    });
  });
  return arr;
}

export type aliasMapType = { [key: string]: string };

export function alias(obj: any, aliasMap: aliasMapType) {
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key].forEach((item: any) => {
        alias(item, aliasMap);
      });
    }
    if (aliasMap[key]) {
      obj[aliasMap[key] as string] = obj[key];
      delete obj[key];
    }
  }
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

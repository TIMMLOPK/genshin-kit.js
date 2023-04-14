export type aliasMapType = { [key: string]: string };

export function alias(obj: any, aliasMap: aliasMapType) {
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      for (const item of obj[key]) {
        alias(item, aliasMap);
      }
    }
    if (aliasMap[key]) {
      obj[aliasMap[key] as string] = obj[key];
      delete obj[key];
    }
  }
  return obj;
}

export function removeFromObject(obj: any, keys: string[]) {
  if (Array.isArray(obj)) {
    for (const item of obj) {
      removeFromObject(item, keys);
    }
  }

  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      for (const item of obj[key]) {
        removeFromObject(item, keys);
      }
    }
    if (keys.includes(key)) {
      delete obj[key];
    }
  }
}

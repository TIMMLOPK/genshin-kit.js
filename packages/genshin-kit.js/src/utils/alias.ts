export type aliasMapType = { [key: string]: string };

export function alias(obj: any, aliasMap: aliasMapType) {
  for (const key in obj) {
    const value = obj[key];
    if (Array.isArray(value)) {
      for (const item of value) {
        alias(item, aliasMap);
      }
    }
    if (aliasMap[key]) {
      obj[aliasMap[key] as string] = value;
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
    if (keys.includes(key)) {
      delete obj[key];
    }
    if (Array.isArray(obj[key])) {
      for (const item of obj[key]) {
        removeFromObject(item, keys);
      }
    }
  }
}

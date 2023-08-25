type aliasMapType<T> = { [key: string]: keyof T };

export function alias<T extends { [key: string]: any }>(obj: T, aliasMap: aliasMapType<T>) {
  const keys = Object.keys(obj ?? {});
  let i = keys.length;
  while (i--) {
    const key = keys[i] ?? "";
    const value = obj[key];

    if (Array.isArray(value)) {
      for (const item of value) {
        alias(item, aliasMap);
      }
    }

    if (aliasMap[key]) {
      obj[aliasMap[key] as keyof T] = value;
      delete obj[key];
    }

    if (typeof value === "object") {
      alias(value, aliasMap);
    }
  }
  return obj;
}

export function removeFromObject<T extends { [key: string]: any }>(obj: T, keys: string[]) {
  if (Array.isArray(obj)) {
    let i = obj.length;
    while (i--) {
      removeFromObject(obj[i], keys);
    }
  }

  const objKeys = Object.keys(obj);
  let i = objKeys.length;
  while (i--) {
    const key = objKeys[i] ?? "";
    if (keys.includes(key)) {
      delete obj[key];
    }
    if (Array.isArray(obj[key])) {
      let j = obj[key].length;
      while (j--) {
        removeFromObject(obj[key][j], keys);
      }
    }
  }
}

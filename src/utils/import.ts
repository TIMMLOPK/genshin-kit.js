
export async function dynamic(path: string) {
  const module = await import(path);
  return module;
}
export async function importModule(path: string) {
  const module = await import(path);
  return module;
}

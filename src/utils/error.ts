export class APIERROR extends Error {
  public readonly retcode: number;
  public readonly description: string | undefined;

  constructor(message: string, retcode: number, description?: string) {
    super(message);
    this.retcode = retcode;
    this.description = description;
  }
}

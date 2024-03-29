export class APIERROR extends Error {
  public readonly retcode: number;
  public readonly description?: string;

  constructor(message: string, retcode: number, description?: string) {
    super(message);
    this.retcode = retcode;
    this.description = description;
  }

  public override get name(): string {
    return `APIError[${this.retcode}]`;
  }
}

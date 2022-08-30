export class BaseError extends Error {
    public override readonly name: string;
    public readonly retcode: number;
    public readonly description: string | undefined;

    constructor(message: string, retcode: number , description?: string) {
        super(message);
        this.name = "[mihoyo API Error]";
        this.retcode = retcode;
        this.description = description;
    }
}
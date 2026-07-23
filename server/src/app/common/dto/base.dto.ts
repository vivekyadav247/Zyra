import { ZodError, type ZodType } from "zod";

export abstract class BaseDto {
  protected static schema: ZodType;

  static validate(data: unknown): unknown {
    try {
      return this.schema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(
          error.issues
            .map((issue) => {
              const path = issue.path.join(".");
              return path ? `${path}: ${issue.message}` : issue.message;
            })
            .join(", "),
        );
      }

      throw error;
    }
  }
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, code: string = "INTERNAL_SERVER_ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return {
      success: false,
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  const message = error instanceof Error ? error.message : "An unexpected error occurred.";
  return {
    success: false,
    code: "UNHANDLED_ERROR",
    message,
    statusCode: 500,
  };
}

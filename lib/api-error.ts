export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public details?: string | Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
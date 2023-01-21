export const DEBUG = process.env.DEBUG ?? true;
export const LOG_LEVEL = process.env.LOG_LEVEL && ['error', 'warn', 'info', 'debug'].includes(String(process.env.LOG_LEVEL))
  ? process.env.LOG_LEVEL
  : DEBUG ? 'debug' : 'error';
export const PORT = process.env.PORT ?? 8081;
export const CORS_ORIGINS = process.env.CORS_ORIGINS ?? "*";
export const CORS_CREDENTIALS = process.env.CORS_CREDENTIALS ?? true;

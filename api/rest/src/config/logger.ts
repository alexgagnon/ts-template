import { createLogger, format, transports } from "winston";
import { LOG_LEVEL } from ".";

const logFormat = format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)

export const logger = createLogger({
  format: format.combine(format.colorize(), logFormat),
  transports: [
    new transports.Console(),
  ],
  level: LOG_LEVEL
});

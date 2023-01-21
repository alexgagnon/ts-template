import { Request, Response, NextFunction } from "express";
import { logger } from "./config/logger";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.debug(">> isAuthenticated");
  const isAuthenticated = req.query["role"] != null;
  logger.debug(`Authenticated: ${isAuthenticated}`);
  if (isAuthenticated) {
    next();
  } else {
    res.sendStatus(401);
  }
  logger.debug("<< isAuthenticated");
}

export function healthCheck(req: Request, res: Response, next: NextFunction) {
  if (req.url == "/health") {
    logger.debug("Health check");
    res.sendStatus(200);
  }
  next();
}

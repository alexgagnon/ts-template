"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = exports.isAuthenticated = void 0;
const logger_1 = require("./config/logger");
function isAuthenticated(req, res, next) {
    logger_1.logger.debug('>> isAuthenticated');
    const isAuthenticated = req.query['role'] != null;
    logger_1.logger.debug(`Authenticated: ${isAuthenticated}`);
    if (isAuthenticated) {
        next();
    }
    else {
        res.sendStatus(401);
    }
    logger_1.logger.debug('<< isAuthenticated');
}
exports.isAuthenticated = isAuthenticated;
function healthCheck(req, res, next) {
    if (req.url == '/health') {
        logger_1.logger.debug('Health check');
        res.sendStatus(200);
    }
    next();
}
exports.healthCheck = healthCheck;
//# sourceMappingURL=middleware.js.map
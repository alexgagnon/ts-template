"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = exports.isAuthenticated = void 0;
const logger_1 = require("./config/logger");
function isAuthenticated(req, res, next) {
    if (req.query['role'] != null) {
        next();
    }
    else {
        res.sendStatus(401);
    }
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
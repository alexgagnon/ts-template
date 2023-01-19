"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const _1 = require(".");
const logFormat = winston_1.format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`);
exports.logger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.colorize(), logFormat),
    transports: [
        new winston_1.transports.Console(),
    ],
    level: _1.LOG_LEVEL
});
//# sourceMappingURL=logger.js.map
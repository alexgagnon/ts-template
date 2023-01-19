"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const _1 = require(".");
exports.logger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
    transports: [
        new winston_1.transports.Console(),
    ],
    level: ((_a = process.env.LOG_LEVEL) !== null && _a !== void 0 ? _a : (_1.DEBUG !== null && _1.DEBUG !== void 0 ? _1.DEBUG : process.env.ENV === 'local')) ? 'debug' : 'error'
});
//# sourceMappingURL=logger.js.map
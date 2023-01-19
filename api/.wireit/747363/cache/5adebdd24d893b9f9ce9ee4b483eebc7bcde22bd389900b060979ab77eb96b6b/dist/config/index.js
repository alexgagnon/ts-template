"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORS_CREDENTIALS = exports.CORS_ORIGINS = exports.PORT = exports.LOG_LEVEL = exports.DEBUG = void 0;
exports.DEBUG = (_a = process.env.DEBUG) !== null && _a !== void 0 ? _a : true;
exports.LOG_LEVEL = process.env.LOG_LEVEL && ['error', 'warn', 'info', 'debug'].includes(String(process.env.LOG_LEVEL))
    ? process.env.LOG_LEVEL
    : exports.DEBUG ? 'debug' : 'error';
exports.PORT = (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 8081;
exports.CORS_ORIGINS = (_c = process.env.CORS_ORIGINS) !== null && _c !== void 0 ? _c : "*";
exports.CORS_CREDENTIALS = (_d = process.env.CORS_CREDENTIALS) !== null && _d !== void 0 ? _d : true;
//# sourceMappingURL=index.js.map
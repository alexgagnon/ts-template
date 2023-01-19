"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORS_CREDENTIALS = exports.CORS_ORIGINS = exports.PORT = exports.LOG_LEVEL = exports.DEBUG = void 0;
exports.DEBUG = (_a = process.env.DEBUG) !== null && _a !== void 0 ? _a : true;
exports.LOG_LEVEL = (_b = process.env.LOG_LEVEL) !== null && _b !== void 0 ? _b : 'error';
exports.PORT = (_c = process.env.PORT) !== null && _c !== void 0 ? _c : 8081;
exports.CORS_ORIGINS = (_d = process.env.CORS_ORIGINS) !== null && _d !== void 0 ? _d : "*";
exports.CORS_CREDENTIALS = (_e = process.env.CORS_CREDENTIALS) !== null && _e !== void 0 ? _e : true;
//# sourceMappingURL=index.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("../config/logger");
const middleware_1 = require("../middleware");
const bookRouter = express_1.default.Router();
bookRouter.use(middleware_1.isAuthenticated);
bookRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.debug('>> getAll');
    logger_1.logger.debug('<< getAll');
}));
bookRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.debug('>> getBook');
    logger_1.logger.debug('<< getBook');
}));
bookRouter.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.debug('>> postBook');
    logger_1.logger.debug('<< postBook');
}));
bookRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.debug('>> putBook');
    logger_1.logger.debug('<< putBook');
}));
bookRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.debug('>> deleteBook');
    logger_1.logger.debug('<< deleteBook');
}));
exports.default = bookRouter;
//# sourceMappingURL=people.js.map
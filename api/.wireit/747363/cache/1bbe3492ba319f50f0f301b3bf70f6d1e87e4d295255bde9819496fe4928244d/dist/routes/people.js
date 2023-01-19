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
const peopleRouter = express_1.default.Router();
peopleRouter.use(middleware_1.isAuthenticated);
peopleRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.debug('>> getAll');
    logger_1.logger.debug('<< getAll');
}));
peopleRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.debug('>> getPerson');
    logger_1.logger.debug('<< getAll');
}));
peopleRouter.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
peopleRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
peopleRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.default = peopleRouter;
//# sourceMappingURL=people.js.map
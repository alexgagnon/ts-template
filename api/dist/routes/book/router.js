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
const logger_1 = require("../../config/logger");
const middleware_1 = require("../../middleware");
const service_1 = require("./service");
const types_1 = require("../../types");
const bookRouter = express_1.default.Router();
bookRouter.use(middleware_1.isAuthenticated);
bookRouter.get('/', (req, res) => {
    logger_1.logger.debug('>> /getAll');
    res.send((0, service_1.getAllBooks)());
    logger_1.logger.debug('<< /getAll');
});
bookRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.debug('>> /getBook');
    const book = (0, service_1.getBook)(req.params.id);
    if (book != null) {
        logger_1.logger.debug('Book not found');
        res.send(book);
    }
    else {
        logger_1.logger.debug('Book found');
        res.sendStatus(404);
    }
    logger_1.logger.debug('<< /getBook');
}));
bookRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.debug('>> /postBook');
    const book = types_1.BookSchema.parse(req.body);
    if ((0, service_1.createBook)(book) != null) {
        logger_1.logger.debug('Book created');
        res.send(book);
    }
    else {
        logger_1.logger.debug('Book not created');
        res.sendStatus(409);
    }
    logger_1.logger.debug('<< /postBook');
}));
bookRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.debug('>> /putBook');
    const id = types_1.BookIdSchema.parse(req.params.id);
    const book = types_1.BookSchema.parse(req.body);
    if ((0, service_1.updateBook)(id, book)) {
        logger_1.logger.debug('Book updated');
        res.sendStatus(204);
    }
    else {
        logger_1.logger.debug('Book not updated');
        res.sendStatus(404);
    }
    logger_1.logger.debug('<< /putBook');
}));
bookRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.debug('>> /deleteBook');
    const id = types_1.BookIdSchema.parse(req.params.id);
    if ((0, service_1.deleteBook)(id)) {
        logger_1.logger.debug('Book deleted');
        res.sendStatus(204);
    }
    else {
        logger_1.logger.debug('Book not deleted');
        res.sendStatus(404);
    }
    logger_1.logger.debug('<< /deleteBook');
}));
exports.default = bookRouter;
//# sourceMappingURL=router.js.map
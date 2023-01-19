"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBook = exports.getAllBooks = void 0;
const uuid_1 = require("uuid");
const lodash_1 = require("lodash");
const logger_1 = require("../../config/logger");
const books = [
    {
        author: 'J.R.R. Tolkien',
        id: uuid_1.NIL,
        title: 'The Lord of the Rings',
        yearPublished: 1940
    }
];
function getAllBooks() {
    return books;
}
exports.getAllBooks = getAllBooks;
function getBook(id) {
    var _a;
    logger_1.logger.debug('>> getBook');
    const book = books.find(book => book.id === id);
    logger_1.logger.debug(`Book ${(_a = !book) !== null && _a !== void 0 ? _a : 'not'} found`);
    return book;
}
exports.getBook = getBook;
function createBook(book) {
    var _a;
    logger_1.logger.debug('>> createBook');
    logger_1.logger.debug(arguments);
    if (books.find(b => (0, lodash_1.isMatch)(b, book) /* NOTE: order of args here matters... */)) {
        logger_1.logger.debug('Match found, conflict');
        return null;
    }
    logger_1.logger.debug('No match, creating');
    book.id = (_a = book.id) !== null && _a !== void 0 ? _a : (0, uuid_1.v4)();
    books.push(book);
    return book;
}
exports.createBook = createBook;
function updateBook(id, book) {
    logger_1.logger.debug('>> updateBook');
    logger_1.logger.debug(arguments);
    const index = books.findIndex(book => book.id === id);
    if (index >= 0) {
        logger_1.logger.debug('Match found, updating');
        books[index] = book;
        return true;
    }
    logger_1.logger.debug('No match found');
    return false;
}
exports.updateBook = updateBook;
function deleteBook(id) {
    logger_1.logger.debug('>> deleteBook');
    logger_1.logger.debug(arguments);
    const index = books.findIndex(book => book.id === id);
    if (index >= 0) {
        logger_1.logger.debug('Match found, deleting');
        books.splice(index, 1);
        return true;
    }
    logger_1.logger.debug('No match found');
    return false;
}
exports.deleteBook = deleteBook;
//# sourceMappingURL=service.js.map
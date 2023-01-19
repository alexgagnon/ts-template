"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.createBook = exports.getBook = exports.getAllBooks = void 0;
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
    return books.find(book => book.id === id);
}
exports.getBook = getBook;
function createBook(book) {
    logger_1.logger.debug('>> createBook');
    logger_1.logger.debug(arguments);
    if (books.find(b => (0, lodash_1.isMatch)(b, book) /* NOTE: order of args here matters... */)) {
        logger_1.logger.debug('Match found');
        return null;
    }
    else {
        logger_1.logger.debug('No match, creating');
        book.id = (0, uuid_1.v4)();
        books.push(book);
        return book;
    }
}
exports.createBook = createBook;
function deleteBook(id) {
    logger_1.logger.debug('>> deleteBook');
    logger_1.logger.debug(arguments);
    const index = books.findIndex(book => book.id === id);
    if (index >= 0) {
        logger_1.logger.debug('Match found, deleting');
        books.splice(index, 1);
        return true;
    }
    else {
        logger_1.logger.debug('No match found');
        return false;
    }
}
exports.deleteBook = deleteBook;
//# sourceMappingURL=service.js.map
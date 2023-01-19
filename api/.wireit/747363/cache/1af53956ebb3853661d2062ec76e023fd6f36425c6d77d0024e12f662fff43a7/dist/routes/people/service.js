"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = exports.getBook = exports.getAllBooks = void 0;
const books = [];
function getAllBooks() {
    return books;
}
exports.getAllBooks = getAllBooks;
function getBook(id) {
    return books.find(book => book.id === id);
}
exports.getBook = getBook;
function createBook(book) {
    if (books.find(b => b.id === book.id)) {
        return false;
    }
    else {
        books.push(book);
        return true;
    }
}
exports.createBook = createBook;
//# sourceMappingURL=service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = exports.getBook = exports.getAllBooks = void 0;
const uuid_1 = require("uuid");
const books = [
    {
        author: "J.R.R. Tolkien",
        id: uuid_1.NIL,
        title: "The Lord of the Rings",
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
    if (books.find(b => b.id === book.id)) {
        return false;
    }
    else {
        book.id = (0, uuid_1.v4)();
        books.push(book);
        return book;
    }
}
exports.createBook = createBook;
//# sourceMappingURL=service.js.map
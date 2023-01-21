import { v4 as uuid, NIL as null_uuid } from 'uuid';
import { isMatch } from 'lodash';
import { Book } from '../../types';
import { logger } from '../../config/logger';

const books: Book[] = [
  {
    author: 'J.R.R. Tolkien',
    id: null_uuid,
    title: 'The Lord of the Rings',
    yearPublished: 1940
  }
];

export function getAllBooks() {
  return books;
}

export function getBook(id: string) {
  logger.debug('>> getBook');
  const book = books.find(book => book.id === id);
  logger.debug(`Book ${!book ?? 'not'} found`);
  return book;
}

export function createBook(book: Book) {
  logger.debug('>> createBook');
  logger.debug(arguments);

  if (books.find(b => isMatch(b, book) /* NOTE: order of args here matters... */ )) {
    logger.debug('Match found, conflict')
    return null;
  }

  logger.debug('No match, creating');
  book.id = book.id ?? uuid();
  books.push(book);
  return book;
}

export function updateBook(id: string, book: Book) {
  logger.debug('>> updateBook');
  logger.debug(arguments);

  const index = books.findIndex(book => book.id === id);
  if (index >= 0) {
    logger.debug('Match found, updating');
    books[index] = book;
    return true;
  }
  logger.debug('No match found');
  return false;
}

export function deleteBook(id: string) {
  logger.debug('>> deleteBook');
  logger.debug(arguments);

  const index = books.findIndex(book => book.id === id);

  if (index >= 0) {
    logger.debug('Match found, deleting');
    books.splice(index, 1);
    return true;
  }
  logger.debug('No match found');
  return false;
}

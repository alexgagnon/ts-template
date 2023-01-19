import express, {Request, Response} from "express";
import { logger } from "../../config/logger";
import { isAuthenticated } from '../../middleware';
import { createBook, deleteBook, getAllBooks, getBook, updateBook } from "./service";
import { BookIdSchema, BookSchema } from '../../types';

const bookRouter = express.Router();

bookRouter.use(isAuthenticated);

bookRouter.get('/', (req: Request, res: Response) => {
  logger.debug('>> /getAll');
  res.send(getAllBooks());
  logger.debug('<< /getAll');
});

bookRouter.get('/:id', async (req: Request, res: Response) => {
  logger.debug('>> /getBook');
  const book = getBook(req.params.id);
  if (book != null) {
    logger.debug('Book not found');
    res.send(book);
  }
  else {
    logger.debug('Book found');
    res.sendStatus(404);
  }
  logger.debug('<< /getBook');
});

bookRouter.post('/', async (req: Request, res: Response) => {
  logger.debug('>> /postBook');
  const book = BookSchema.parse(req.body);
  if (createBook(book) != null) {
    logger.debug('Book created');
    res.send(book);
  }
  else {
    logger.debug('Book not created');
    res.sendStatus(409);
  }
  logger.debug('<< /postBook');
});

bookRouter.put('/:id', async (req: Request, res: Response) => {
  logger.debug('>> /putBook');
  const id = BookIdSchema.parse(req.params.id);
  const book = BookSchema.parse(req.body);
  if (updateBook(id, book)) {
    logger.debug('Book updated');
    res.sendStatus(204);
  }
  else {
    logger.debug('Book not updated');
    res.sendStatus(404);
  }
  logger.debug('<< /putBook');
});

bookRouter.delete('/:id', async (req: Request, res: Response) => {
  logger.debug('>> /deleteBook');
  const id = BookIdSchema.parse(req.params.id);
  if (deleteBook(id)) {
    logger.debug('Book deleted');
    res.sendStatus(204);
  }
  else {
    logger.debug('Book not deleted');
    res.sendStatus(404);
  }
  logger.debug('<< /deleteBook');
});


export default bookRouter;

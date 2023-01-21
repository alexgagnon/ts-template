import * as dotenv from 'dotenv';
dotenv.config(); // add variables from `.env` file. NOTE: this does not override OS/User environment variables
import { PORT, CORS_ORIGINS } from './config';
import { logger } from './config/logger';
import morgan from 'morgan';
import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { healthCheck } from './middleware';
import peopleRouter from './routes/book/router';

(async () => {
  try {
    const app: Express = express();
    app.set('trust proxy', 1); // allows cookies to be used despite service having different domain than proxy
    app.use(morgan(process.env.ENV === 'local' ? 'dev' : 'common')); // http logging
    app.use(healthCheck);
    app.use(helmet()); // BP: add protective headers and disables 'x-powered-by'
    app.use(cors({origin: CORS_ORIGINS, credentials: true}));
    app.use(express.json()); // allow json parsing of request bodies that have 'Content-Type': application/json
    app.use(express.urlencoded({ extended: false })); // allow urlencoded parsing of request bodies
    app.use(cookieParser());

    // NOTE: order here matters... requests fall through until a match is found
    app.get('/', (req: Request, res: Response) => {
      res.send('Welcome to the API');
    });

    app.use('/books', peopleRouter); // any other request should go to storage account

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  }
  catch (err) {
    console.error(err);
  }
})();


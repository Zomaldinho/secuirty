require('dotenv').config();
import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/ErrorHandler';
import { router } from './routes';

export class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
  }

  initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(router);
    this.app.use(errorHandler);
  }

  public listen() {
    if (process.env.PORT && process.env.HOST) {
      this.app.listen(+process.env.PORT, process.env.HOST, () => {
        console.log(`Server is listening on port ${process.env.PORT}`);
      });
    }
  }
}

new App().listen();

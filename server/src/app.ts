import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';

class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    config();
  }

  initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors);
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

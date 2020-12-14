import express from 'express';
import * as database from '../db/database';
import { eventRouter } from '../route/eventRoute';
import { expressLogger, logger } from '../util/logger';


export class Server {

  app: express.Application;
  port: number;

  constructor(port?: number) {
    this.app = express();
    this.port = port || 3000;
  }

  async initServer() {
    this.app.use(express.json());
    this.app.use(expressLogger);
    try {
      await database.connect();
      this.registerRoutes();
      this.listen();
    } catch(error) {
      logger.error(`Error while server initialization: ${error}`);
    }
  }

  private registerRoutes() {
    this.app.use('/api/events', eventRouter);
  }

  private listen() {
    this.app.listen(this.port, () => {
      logger.info(`Listening on port: ${this.port}`);
    });
  }

}
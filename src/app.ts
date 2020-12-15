import "reflect-metadata";
import {logger } from './util/logger';
import Server from "./server/server";

const httpPort = 3000;

const httpServer = new Server();
httpServer.initServer()
.then(() => {
  logger.info(`Server succesfully initialized`);
}).catch((err) => {
  process.exit(1);
});
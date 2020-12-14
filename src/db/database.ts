import {Connection, createConnection} from "typeorm";
import { logger } from '../util/logger';

let connection: Connection;

export async function connect() {
  logger.info('Trying to connect to database');
  connection = await createConnection(); 
}

export  { connection };
import {Connection, ConnectionOptions, createConnection} from "typeorm";
import { logger } from '../util/logger';
import dotenv from 'dotenv';
dotenv.config();

let connection: Connection;

const dbConfig: ConnectionOptions = {
  "type": "mysql",
  "host": process.env.DB_HOST || 'localhost',
  "port": Number(process.env.DB_PORT) || 3306,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASS,
  "database": process.env.DB_NAME || "event_tracker",
  "synchronize": true,
  "logging": false,
  "entities": [
     "src/model/entities/**/*.ts"
  ],
  "insecureAuth": true
}

console.log(dbConfig);

export async function connect() {
  logger.info('Trying to connect to database');
  connection = await createConnection(dbConfig); 
}

export  { connection };
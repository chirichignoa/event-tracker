import dotenv from 'dotenv';
import { logger } from '../util/logger';
import EventEntity from "../model/entities/event.entity";
import {Connection, ConnectionOptions, createConnection} from "typeorm";

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
    EventEntity
  ],
  "insecureAuth": true
}

export async function connect() {
  logger.info('Trying to connect to database');
  connection = await createConnection(dbConfig); 
}

export  { connection };
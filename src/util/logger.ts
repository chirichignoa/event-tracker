import winston from 'winston';
import expressWinston from 'express-winston';

export const expressLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(i => `${i.timestamp} | ${i.message}`)
  ),
  meta: false, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
});

class Logger {

  logger: winston.Logger; 

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD hh:mm:ss'}),
        winston.format.colorize(),
        winston.format.printf(i => `${i.timestamp} - [${i.level}] | ${i.message}`),
      ),
      transports: [
        new winston.transports.Console(),
      ],
    });
    
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  info(message: string) {
    this.logger.info(message);
  }
  
  warn(message: string) {
    this.logger.warn(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

}

export const logger = new Logger();
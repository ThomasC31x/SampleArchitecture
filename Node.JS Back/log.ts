import fs from 'fs';
import path from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

require('dotenv').config()

const dir = process.env.LOG_DIR as string

// logs dir
console.log(`Initializing log.dir form ${dir}`);
const logDir: string = path.join(__dirname, dir);

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
let logger;

if(process.env.PROD == "true") {

  logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      logFormat,
    ),
    transports: 
    [
      // debug log setting
      new winstonDaily({
        level: 'debug',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir + '/debug', // log file /logs/debug/*.log in save
        filename: `%DATE%.log`,
        maxFiles: 30, // 30 Days saved
        json: false,
        zippedArchive: true,
      }),
      // error log setting
      new winstonDaily({
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        dirname: logDir + '/error', // log file /logs/error/*.log in save
        filename: `%DATE%.log`,
        maxFiles: 30, // 30 Days saved
        handleExceptions: true,
        json: false,
        zippedArchive: true,
      }),
    ]
  });
  
} else {
  
  logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      logFormat,
    ),
    transports: new winston.transports.Console()
  });

}


export { logger };

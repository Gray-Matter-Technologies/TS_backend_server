import { NextFunction } from "express";
import winston from 'winston'
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const customFormat = printf((info:any) => {
  let { message } = info;
  if (typeof message === 'object') {
    let cache: string[] = [];
    message = JSON.stringify(message, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Duplicate reference found
          try {
            // If this value does not reference a parent it can be deduped
            return JSON.parse(JSON.stringify(value));
          } catch (error) {
            // discard key if value cannot be deduped
            return undefined;
          }
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = [];
  }
  return `> ${info.timestamp} ${info.level}: ${message}`;
});



const logger = createLogger({
  format: combine(
    format.colorize(),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    customFormat,
  ),
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === "production" ? "error" : "debug"
  }),
  new winston.transports.File({ filename: "debug.log", level: "debug" })

  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level");
}
export const Logger = (req:Request, res:Response, next:NextFunction) => {
  logger.info(`handle request url ${req.url}`);
  next();
};
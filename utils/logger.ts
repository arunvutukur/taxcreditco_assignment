import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
 
const { combine, timestamp, printf } = format;
 
const loggerLevel = process.env.LOGGERLEVEL;
 
export const logger = createLogger({
    level: loggerLevel,
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss.SSS'
        }),
        printf((info) => {
            return JSON.stringify({
                timestamp: [info.timestamp],
                level: [info.level.toUpperCase()],
                message: info.message,
            });
        })
    ),
    transports: [
        new transports.Console({
            level: loggerLevel
        }),
        new DailyRotateFile({
            filename: './logs/playwright_executionlog_%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '3d',
            level: loggerLevel
        })
    ]
});

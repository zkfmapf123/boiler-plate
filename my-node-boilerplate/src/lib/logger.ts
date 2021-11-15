import * as winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

const logDir = "./logs"
const {combine, timestamp, printf} = winston.format;

const logFormat = printf(info =>{
    return `${info.timestamp} (${info.level}) => ${info.message}`;
});

/*
    log level
    error : 0
    warn : 1
    info : 2
    http : 3
    verbose : 4
    debug : 5
    silly : 6
*/

const logger = winston.createLogger({
    format : combine(
        timestamp({
            format:"YYYY-MM-DD HH:mm:ss",
        }),
        logFormat
    ),

    transports:[
        //info
        new winstonDaily({
            level : "info",
            datePattern : "YYYY-MM-DD",
            dirname : logDir,
            filename : "info.log",
            maxFiles : 10, //10일치 
            zippedArchive : true
        }),

        //error
        new winstonDaily({
            level : "error",
            datePattern : "YYYY-MM-DD",
            dirname : logDir,
            filename : "Error.log",
            maxFiles : 10,
            zippedArchive : true
        })
    ]
});

export default logger;
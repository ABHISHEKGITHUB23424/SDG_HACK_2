import winston from "winston";

const { combine, timestamp, printf, colorize, json } = winston.format;

const humanReadableFormat = printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (Object.keys(metadata).length > 0) {
        msg += ` ${JSON.stringify(metadata)}`;
    }
    return msg;
});

export const logger = winston.createLogger({
    level: "info",
    format: combine(timestamp(), json()),
    transports: [
        new winston.transports.Console({
            format: combine(colorize(), timestamp({ format: "HH:mm:ss" }), humanReadableFormat),
        }),
        new winston.transports.File({ filename: "app.log" }),
        new winston.transports.File({ filename: "error.log", level: "error" }),
    ],
});

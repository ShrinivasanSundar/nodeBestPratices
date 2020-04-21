const { format, transports, createLogger } = require("winston");
const path = require("path");
const fileDir = path.join(__dirname, "logs/error.log");
const logger = (directory) => {
    return createLogger({
        format: format.combine(
            format.prettyPrint(),
            format.label({ label: getLabel(directory) }),
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            })),
        level: 'info',
        transports: [
            new transports.Console({
                format: format.combine(format.colorize(),
                    format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`))
            }),
            new transports.File({
                filename: `${fileDir}`,
                level: 'error',
                format: format.combine(format.printf(info => `${info.timestamp} ${info.level} : ${info.message}`))
            })
        ]
    })
}

const getLabel = (directory) => {
    const parts = directory.filename.split(path.sep);
    return path.join(parts[parts.length - 2], parts.pop());
}


module.exports = logger;



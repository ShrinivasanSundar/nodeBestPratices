const { format, transports, createLogger,addColors } = require("winston");
const path = require("path");
const fileDir = path.join(__dirname, "logs/error.log");
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'blue',
    debug: 'white',
  }
  
const Logger = (...args) => {
    addColors(colors);
    return createLogger({
        format: format.combine(
            format.prettyPrint(),
            format.label({ label: getLabel(args[0]) }),
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            })),
        level: 'http',
        transports: [
            new transports.Console({
                format: format.combine(format.colorize({
                    all:true
                }),
                format.splat(),
                format.printf(({timestamp,level,label,message,...meta}) => `${timestamp} ${level} [${label?label:""}]: ${message}, ${(Object.keys(meta).length!=0)?JSON.stringify(meta):''}`)
                    )
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
    if(directory){
    const parts = directory.filename.split(path.sep);
    return path.join(parts[parts.length - 2], parts.pop());
    }else{
        return null;
    }
}



module.exports = Logger;



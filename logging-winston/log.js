const winston = require('winston');
const config = require('./config');

async function createLogger(moduleName) {
    return winston.createLogger({
        level: config.log.level,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.label({ moduleName }),
            winston.format.timestamp(),
            winston.format.splat(),
            winston.format.printf(function(props){
                const { level, message, label, timestamp } = props;
                return `[${timestamp}] [${level}] [${label}] ${message}`;
            })
        ),
        transports: [
            new winston.transports.Console()
        ]
    });
}

module.exports = {
    createLogger,
};

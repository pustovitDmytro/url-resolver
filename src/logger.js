const { createLogger, format, transports } = require('winston');

const { LOG_LEVEL } = process.env;
const level = LOG_LEVEL || DEBUG && 'debug' || 'info';// eslint-disable-line no-undef

export default createLogger({
    level,
    levels : {
        error   : 0,
        warn    : 1,
        info    : 2,
        notice  : 3,
        verbose : 4,
        debug   : 5
    },
    format : format.combine(
        format.timestamp(),
        format.json()
    ),
    transports : [ new transports.Console() ]
});

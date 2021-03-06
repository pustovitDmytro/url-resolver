import Console from 'winston-console-transport';
import { createLogger, format } from 'winston';

const { LOG_LEVEL, DEBUG } = process.env;
const level = LOG_LEVEL || DEBUG && 'debug' || 'info'; // eslint-disable-line no-undef

export default createLogger({
    level,
    levels : {
        error : 0,
        warn  : 1,
        info  : 2,
        debug : 3
    },
    format : format.combine(
        format.timestamp(),
        format.json()
    ),
    transports : [ new Console() ]
});

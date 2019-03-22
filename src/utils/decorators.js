
import { inspect } from 'util';
import  logger  from '../logger';
import { name } from '../../package';
import { getMethodNames, getBenchmark, startBenchmark, isClass, isFunction } from './common';

function getMethodDescriptor(propertyName, target) {
    if (target.prototype.hasOwnProperty(propertyName)) {
        return Object.getOwnPropertyDescriptor(target.prototype, propertyName);
    }

    return {
        configurable : true,
        enumerable   : true,
        writable     : true,
        value        : target.prototype[propertyName]
    };
}

function defaultSanitizer(data) {
    return inspect(data);
}

function getFunctionLoggerDecorator(method, {
    serviceName = name,
    methodName,
    paramsSanitizer = defaultSanitizer,
    resultSanitizer = defaultSanitizer,
    errorSanitizer = defaultSanitizer,
    level = 'verbose'
} = {}) {
    const logMethodName = methodName || method.name;

    return async function (...args) {
        const time = startBenchmark();

        try {
            const result = await method.apply(this, args);

            logger[level]({
                service   : serviceName,
                method    : logMethodName,
                params    : paramsSanitizer(args),
                result    : resultSanitizer(result),
                benchmark : getBenchmark(time)
            });

            return result;
        } catch (error) {
            logger.error({
                service   : serviceName,
                method    : logMethodName,
                params    : paramsSanitizer(args),
                error     : errorSanitizer(error),
                benchmark : getBenchmark(time)
            });
            throw error;
        }
    };
}

function getClassLoggerDecorator(serviceName, {
    paramsSanitizer = defaultSanitizer,
    resultSanitizer = defaultSanitizer,
    errorSanitizer = defaultSanitizer,
    level = 'verbose'
} = {}) {
    return function (target) {
        const logServiceName = serviceName || target.name;

        getMethodNames(target.prototype).forEach(methodName => {
            const descriptor = getMethodDescriptor(methodName, target);
            const originalMethod = descriptor.value;

            descriptor.value = getFunctionLoggerDecorator(originalMethod, {
                serviceName : logServiceName,
                methodName,
                paramsSanitizer,
                resultSanitizer,
                errorSanitizer,
                level
            });

            Object.defineProperty(target.prototype, methodName, descriptor);
        });
    };
}

export function log(...args) {
    return function (target) {
        if (isClass(target)) return getClassLoggerDecorator(...args)(target);
        if (isFunction(target)) return getFunctionLoggerDecorator(target, ...args);
    };
}

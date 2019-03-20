/* eslint-disable func-style*/
const isGetter = (x, name) => (Object.getOwnPropertyDescriptor(x, name) || {}).get;

const deepFunctions = x =>
    x && x !== Object.prototype &&
  Object.getOwnPropertyNames(x)
      .filter(name => isGetter(x, name) || isFunction(x[name]))
      .concat(deepFunctions(Object.getPrototypeOf(x)) || []);

const distinctDeepFunctions = x => Array.from(new Set(deepFunctions(x)));

export const getMethodNames = x => distinctDeepFunctions(x).filter(name => name !== 'constructor' && name.indexOf('_') !== 0);
/* eslint-enable func-style*/

export function isString(x) {
    return x && Object.prototype.toString.call(x) === '[object String]';
}

export function isClass(v) {
    return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
}

export function isFunction(x) {
    return x && [ '[object Function]', '[object AsyncFunction]' ].includes(Object.prototype.toString.call(x));
}

export function isEmpty(x) {
    return x && x.constructor === Object && Object.keys(x).length === 0;
}

export function isObject(x) {
    return x && Object.prototype.toString.call(x) === '[object Object]';
}

export function isArray(x) {
    return x && Object.prototype.toString.call(x) === '[object Array]';
}


// const NS_PER_SEC = 1e9;
// const MS_PER_NS = 1e-6;

// export function getBenchmark(time) {
//     const diff = process.hrtime(time);
//     const msTime = (diff[0] * NS_PER_SEC + diff[1])  * MS_PER_NS;

//     return msTime.toFixed(5);
// }

export function startBenchmark() {
    return performance.now();
}

export function getBenchmark(time) {
    const diff = performance.now() - time;

    return diff.toFixed(5);
}


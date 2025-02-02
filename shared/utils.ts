import { HANDLE_REGEX_GLOBAL } from './constants';

const memoize = (cb: Function) => {
    const cache: Record<string, any> = {};
    return (...args: any[]) => {
        const key = args.join(); // ideally we should hash this to get key
        if (cache[key] != null) {
            return cache[key];
        } else {
            const result = cb(...args);
            cache[key] = result;
            return result;
        }
    };
};


// ======= template processing without library but does not work with unsafe-eval ======= //
// NOTE: This should be used if page-craft is used on the backend for frontend service
const generateFn = (str: string, keyName = 'data') => {
    let ogStr = str;
    // identify all handlebar variables
    const matches = ogStr.matchAll(HANDLE_REGEX_GLOBAL);
    let isString = false;
    for (const match of matches) {
        const og = match[0];
        // const index = match.index;
        // if there are multiple variables or static string
        // this flag will be true
        isString = og.length !== ogStr.trim().length;
        if (isString) {
            // if the output needs to be string then form the string
            // replace {a} with " + (a) + "
            const variableName = og.replace('{', '" + (').replace('}', ') + "');
            ogStr = ogStr.replace(og, variableName);
        } else {
            // if not a string, then this else will be called just one and we can return from here
            const cleanCode = og.replace('{', '').replace('}', '').trim();
            const dynamicFn = new Function(keyName, `return (${cleanCode});`);
            return dynamicFn;
        }
    }

    // it str was a string then post the loop out string should be ready
    // now we need to just return
    if (isString) {
        const dynamicFn = new Function(keyName, `return "${ogStr}";`);
        return dynamicFn;
    }

    return str;
};
const memoizedGenerateFn = memoize(generateFn);
export const processTemplate = (str: string, data: any, keyName = 'data') => {
    const dynamicFn = memoizedGenerateFn(str, keyName);
    if (typeof dynamicFn === 'function') {
        return dynamicFn(data);
    }
    return str;
};
// ======= template processing without library but does not work with unsafe-eval ======= //

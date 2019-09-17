"use strict";

const fastDiff = require("fast-diff");


/**
 *
 * @param {string} original original JSON
 * @param {string} diff diff JSON
 * @param {object} options options
 * @returns {object}
 */
function jsonDiff(original, diff, options = Object.create(null)) {
    if (typeof original === typeof diff) {
        const result = {};
        for (const { key, type, code, value } of [...objDiff(original, diff)]) {
            Reflect.set(result, key, { type, code, value });
        }

        return { type: "object", result };
    }

    return null;
}

/**
 *
 * @param {*} obj1 obj1
 * @param {*} obj2 obj2
 * @param {*} options options
 */
function* objDiff(obj1, obj2, options = Object.create(null)) {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    for (const key of obj1Keys) {
        const obj1Value = obj1[key];

        if (!obj2Keys.includes(key)) {
            yield { key, type: typeof obj1Value, code: -1, value: obj1Value };
            continue;
        }

        const obj2Value = obj2[key];
        if (typeof obj1Value !== typeof obj2Value) {
            // rework
            yield { key, code: 1, type: "mixed", value: { oldVal: obj1Value, newVal: obj2Value } };
            const index = obj2Keys.indexOf(key);
            obj2Keys.splice(index, 1);
            continue;
        }
        switch (typeof obj1Value) {
            case "object":
                if (Array.isArray(obj1Value)) {
                    yield { key, type: "array", code: 0, value: [...arrayDiff(obj1Value, obj2Value)] };
                    break;
                }

                /* eslint-disable-next-line */
                const newObj = {};
                for (const { key, type, code, value } of [...objDiff(obj1Value, obj2Value)]) {
                    Reflect.set(newObj, key, { type, code, value });
                }
                yield { key, code: 0, type: "object", value: newObj };
                break;
            default:
                /* eslint-disable-next-line */
                const { code, type, value } = primitiveDiff(obj1Value, obj2Value);
                yield { key, type, code, value };
        }
        const index = obj2Keys.indexOf(key);
        obj2Keys.splice(index, 1);
    }

    for (const key of obj2Keys) {
        yield { key, type: typeof obj2[key], code: 1, value: obj2[key] };
    }
}

/**
 *
 * @param {number|string|boolean} primitive1 primitive1
 * @param {number|string|boolean} primitive2 primitive2
 * @param {object} options options
 * @returns {object}
 */
function primitiveDiff(primitive1, primitive2, options = Object.create(null)) {
    if (primitive1 === primitive2) {
        return { code: 0, type: typeof primitive1, value: primitive1 };
    }

    return { code: 1, type: typeof primitive1, value: { oldVal: primitive1, newVal: primitive2 } };
}

/**
 *
 * @param {Array} arr1 arr1
 * @param {Array} arr2 arr2
 * @param {object} options options
 */
function* arrayDiff(arr1, arr2, options = Object.create(null)) {
    for (const item of arr1) {
        if (arr2.includes(item)) {
            yield { code: 0, type: typeof item, value: item };
            const index = arr2.indexOf(item);
            arr2.splice(index, 1);
            continue;
        }

        yield { code: -1, type: typeof item, value: item };
    }

    for (const item of arr2) {
        yield { code: 1, type: typeof item, value: item };
    }
}

module.exports = jsonDiff;

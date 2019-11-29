"use strict";

// Require Third-party Dependencies
const is = require("@slimio/is");
const clonedeep = require("lodash.clonedeep");

// Require Internal Dependencies
const colorObj = require("./src/color.js");
const { oldNew, diffValue } = require("./src/utils");

/**
 * @function jsonDiff
 * @param {string} original original JSON
 * @param {string} diff diff JSON
 * @param {object} options options
 * @param {boolean} [options.color=true] stdout JSON in the TTY with colors
 * @returns {object|void}
 *
 * @throws {TypeError}
 */
function jsonDiff(original, diff, options = Object.create(null)) {
    if (!is.object(original)) {
        throw new TypeError("original must be a JavaScript object");
    }
    if (!is.object(diff)) {
        throw new TypeError("diff must be a JavaScript object");
    }

    const result = objDiff(clonedeep(original), clonedeep(diff));

    return options.color ? colorObj(result) : { type: "object", result };
}

/**
 * @function objDiff
 * @param {object} obj1
 * @param {object} obj2
 * @returns {JSONDiff.BlockObject}
 */
function objDiff(obj1, obj2) {
    /** @type {JSONDiff.BlockObject} */
    const result = Object.create(null);
    const obj2Keys = new Set(Object.keys(obj2));

    for (const key of Object.keys(obj1)) {
        if (!obj2Keys.has(key)) {
            result[key] = diffValue(obj1[key], -1);
            continue;
        }
        const obj1Value = obj1[key];
        const obj2Value = obj2[key];

        if (typeof obj1Value === typeof obj2Value) {
            if (is.primitive(obj1Value)) {
                result[key] = primitiveDiff(obj1Value, obj2Value);
            }
            else {
                const isArray = is.array(obj1Value);
                const value = (isArray ? arrayDiff : objDiff)(obj1Value, obj2Value);
                result[key] = { code: 0, type: isArray ? "array" : "object", value };
            }
        }
        else {
            result[key] = { code: 1, type: "mixed", value: oldNew(obj1Value, obj2Value) };
        }

        obj2Keys.delete(key);
    }

    for (const key of obj2Keys) {
        result[key] = diffValue(obj2[key]);
    }

    return result;
}

/**
 * @function primitiveDiff
 * @param {number|string|boolean} primitiveLeft
 * @param {number|string|boolean} primitiveRight
 * @returns {JSONDiff.Block}
 */
function primitiveDiff(primitiveLeft, primitiveRight) {
    const type = typeof primitiveLeft;

    return primitiveLeft === primitiveRight ?
        diffValue(primitiveLeft, 0) :
        { code: 1, type, value: oldNew(primitiveLeft, primitiveRight) };
}

/**
 * @function arrayDiff
 * @param {Array} arrLeft
 * @param {Array} arrRight
 * @returns {JSONDiff.Block[]}
 */
function arrayDiff(arrLeft, arrRight) {
    const result = [];
    const rightArrCopy = arrRight.slice(0);

    for (const item of arrLeft) {
        const itemIndex = rightArrCopy.indexOf(item);
        result.push(diffValue(item), itemIndex === -1 ? -1 : 1);

        if (itemIndex !== -1) {
            rightArrCopy.splice(itemIndex, 1);
        }
    }

    return result.concat(rightArrCopy.map((item) => diffValue(item)));
}

module.exports = jsonDiff;

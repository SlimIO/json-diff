"use strict";

/**
 * @namespace Utils
 */

/**
 * @function oldNew
 * @memberof Utils#
 * @param {!any} oldVal
 * @param {!any} newVal
 * @returns {object}
 */
function oldNew(oldVal, newVal) {
    return { oldVal, newVal };
}

/**
 * @function diffValue
 * @memberof Utils#
 * @param {!any} value
 * @param {number} [code=1]
 * @param {any} [type]
 * @returns {JSONDiff.Block}
 */
function diffValue(value, code = 1, type = typeof value) {
    return { code, type, value };
}

module.exports = {
    oldNew,
    diffValue
};

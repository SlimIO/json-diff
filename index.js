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
    console.log(typeof original);
    console.log(typeof diff);
    console.log(typeof original === typeof diff);
    if (typeof original === typeof diff) {
        console.log("objDiff");

        return { type: "object", diff: [...objDiff(original, diff)] };
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
    const deletedKeys = [];
    const addedKeys = [];

    for (const key of obj1Keys) {
        if (!obj2Keys.includes(key)) {
            yield { key, value: obj1[key] };
            continue;
        }

        const obj1Value = obj1[key];
        const obj2Value = obj2[key];
        console.log(key);
        console.log(obj2Keys.includes(key));
        if (typeof obj1Value !== typeof obj2Value) {
            yield { key, value: { oldVal: obj1Value, newVal: obj2Value } };
            continue;
        }
        switch (typeof obj1Value) {
            case "object":
                console.log("object !");
                yield { key, value: objDiff(obj1Value, obj2Value) };
                break;
            case "array":
                console.log("array !");
                yield { key, value: arrayDiff(obj1Value, obj2Value) };
                break;
            default:
                console.log("primitives !");
                yield { key, value: primitiveDiff(obj1Value, obj2Value) };
        }
    }
}

/**
 *
 * @param {number} number1 number1
 * @param {number} number2 number2
 * @param {object} options options
 * @returns {object}
 */
// function numberDiff(number1, number2, options = Object.create(null)) {
//     if (number1 === number2) {
//         return { code: 0, value: number1 };
//     }

//     return { code: -1, value: { old: number1, new: number2 } };
// }

/**
 *
 * @param {number|string|boolean} primitive1 primitive1
 * @param {number|string|boolean} primitive2 primitive2
 * @param {object} options options
 * @returns {object}
 */
function primitiveDiff(primitive1, primitive2, options = Object.create(null)) {
    if (primitive1 === primitive2) {
        return primitive1;
    }

    return { oldVal: primitive1, newVal: primitive2 };
}

/**
 *
 * @param {Array} arr1 arr1
 * @param {Array} arr2 arr2
 * @param {object} options options
 */
function arrayDiff (arr1, arr2, options = Object.create(null)) {

}

module.exports = jsonDiff; 

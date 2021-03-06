"use strict";

// Require Third-party Dependencies
const is = require("@slimio/is");
const { red, green, grey } = require("kleur");

// CONSTANTS
const INDENT = 4;

/**
 * @function colorObj
 * @param {object} obj obj
 * @param {number} [indent=1] indent
 * @returns {void}
 */
function colorObj(obj, indent = 1) {
    if (is.array(obj)) {
        colorArray(obj, indent);

        return;
    }

    if (indent === 1) {
        console.log(grey().bold("{"));
    }

    const objEntries = Object.entries(obj);
    const [lastKey] = objEntries[objEntries.length - 1];
    for (const [key, { code, type, value }] of objEntries) {
        const comma = key !== lastKey;

        switch (type) {
            case "object": {
                getLine(code, type, value, { key, indent, comma });
                if (code === 0) {
                    colorObj(value, indent + 1);
                    console.log(grey().bold(`${" ".repeat(indent * INDENT)}}${comma ? "," : ""}`));
                    break;
                }

                const split = JSON.stringify(value, null, INDENT).split("\n");
                split.shift();

                const colorFn = code === 1 ? green : red;
                const sign = code === 1 ? "+" : "-";
                for (const [index, line] of split.entries()) {
                    if (index === split.length - 1) {
                        console.log(colorFn(`${sign}${" ".repeat(indent * INDENT).slice(1)}${line}${comma ? "," : ""}`));
                    }
                    else {
                        console.log(colorFn(`${sign}${" ".repeat(indent * INDENT).slice(1)}${line}`));
                    }
                }

                break;
            }

            case "array":
                getLine(code, type, value, { key, indent, comma });
                colorArray(value, indent + 1);
                console.log(grey().bold(`${" ".repeat(indent * INDENT)}]${comma ? "," : ""}`));
                break;

            default:
                if (typeof type === "object") {
                    // TBC
                    break;
                }
                if (typeof value === "object") {
                    const { oldVal, newVal } = value;
                    getLine(-1, type, oldVal, { key, indent, comma });
                    const val = typeof newVal === "object" ? JSON.stringify(newVal) : newVal;
                    getLine(code, type, val, { key, indent, comma });
                    break;
                }
                getLine(code, type, value, { key, indent, comma });
        }
    }

    if (indent === 1) {
        console.log(grey().bold("}"));
    }
}

/**
 * @function colorArray
 * @param {Array} arr arr
 * @param {number} [indent=1] indent
 * @returns {void}
 */
function colorArray(arr, indent = 1) {
    for (const [id, { code, type, value }] of arr.entries()) {
        const comma = id !== arr.length + 1;
        getLine(code, type, value, { indent, comma });
    }
}

/**
 * @function getLine
 * @param {number} indent indent
 * @param {number} code code
 * @param {string} type type
 * @param {any} value value
 * @returns {void}
 */
/* eslint-disable-next-line */
function getLine(code, type, value, options = Object.create(null)) {
    const { key, indent = 1, comma } = options;

    let newVal = "";
    switch (type) {
        case "object":
            newVal = "{";
            break;
        case "array":
            newVal = "[";
            break;
        default:
            newVal = comma === true ? `${value},` : value;
    }

    const str = typeof key === "undefined" ?
        `${" ".repeat(indent * INDENT)}${newVal}` :
        `${" ".repeat(indent * INDENT)}${key}: ${newVal}`;

    switch (code) {
        case 1: console.log(green(`+${str.slice(1)}`)); break;
        case -1: console.log(red(`-${str.slice(1)}`)); break;
        default: console.log(grey().bold(str));
    }
}

module.exports = colorObj;

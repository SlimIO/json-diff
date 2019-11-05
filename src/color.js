"use strict";

const { red, green } = require("kleur");

const INDENT = 4;

/**
 * @function colorObj
 * @param {object} obj obj
 * @param {number} indent indent
 */
function colorObj(obj, indent = 1) {
    if (indent === 1) {
        console.log("{");
    }
    const [lastKey] = Object.entries(obj).pop();
    for (const [key, { code, type, value }] of Object.entries(obj)) {
        // console.log(lastKey);
        const comma = key !== lastKey;
        switch (type) {
            case "object":
                getLine(code, type, value, { key, indent, comma });
                colorObj(value, indent + 1);
                console.log(`${" ".repeat(indent * INDENT)}}${comma ? "," : ""}`);
                break;
            case "array":
                getLine(code, type, value, { key, indent, comma });
                colorArray(value, indent + 1);
                console.log(`${" ".repeat(indent * INDENT)}]${comma ? "," : ""}`);
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
        console.log("}");
    }
}

/**
 * @function colorArray
 * @param {Array} arr arr
 * @param {number} indent indent
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
 */
/* eslint-disable no-param-reassign */
/* eslint-disable-next-line */
function getLine(code, type, value, options = Object.create(null)) {
    const { key, indent = 1, comma } = options;
    switch (type) {
        case "object": value = "{"; break;
        case "array": value = "["; break;
        default:
            if (comma === true) {
                value += ",";
            }
    }

    let str = "";
    if (key === undefined) {
        str = `${" ".repeat(indent * INDENT)}${value}`;
    }
    else {
        str = `${" ".repeat(indent * INDENT)}${key}: ${value}`;
    }
    switch (code) {
        case 1: console.log(green(`+${str.slice(1)}`)); break;
        case -1: console.log(red(`-${str.slice(1)}`)); break;
        default: console.log(str);
    }
}

module.exports = colorObj;

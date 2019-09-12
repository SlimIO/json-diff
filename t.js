"use strict";

const jsonDiff = require("./index.js");
const { readFile } = require("fs").promises;

/**
 *
 */
async function main() {
    const json1 = JSON.parse(await readFile("./test1.json"));
    const json2 = JSON.parse(await readFile("./test2.json"));

    const { type, diff } = jsonDiff(json1, json2);
    console.log(JSON.stringify(diff, null, 4));
    if (type === "object") {
        console.log("{");
    }
    for (const { key, value } of diff) {
        if (typeof value === "object") {
            const { oldVal, newVal } = value;
            console.log(`\t-${key}: ${oldVal},`);
            if (typeof newVal === "object") {
                console.log(`\t+${key}: ${JSON.stringify(newVal, null, 4)},`);
                continue;
            }
            console.log(`\t+${key}: ${newVal},`);
            continue;
        }
        console.log(`\t${key}: ${value},`);
    }
    if (type === "object") {
        console.log("}");
    }
}
main().catch(console.error);

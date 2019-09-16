"use strict";

const jsonDiff = require("./index.js");
const { readFile } = require("fs").promises;
const fastDiff = require("fast-diff");

/**
 *
 */
async function main() {
    const json1 = JSON.parse(await readFile("./test/test1.json"));
    const json2 = JSON.parse(await readFile("./test/test2.json"));

    // const jsonStr1 = await readFile("./test1.json", { encoding: "utf-8" });
    // const jsonStr2 = await readFile("./test2.json", { encoding: "utf-8" });

    // console.log(jsonStr1);
    // console.log(jsonStr2);

    // console.time("fastjson");
    // const result = fastDiff(jsonStr1, jsonStr2);
    // console.timeEnd("fastjson");

    // console.log(result);

    console.time("json");
    const { type, result } = jsonDiff(json1, json2);
    console.timeEnd("json");

    console.log(JSON.stringify(result, null, 4));

    // if (type === "object") {
    //     console.log("{");
    // }
    // for (const { key, value } of result) {
    //     if (typeof value === "object") {
    //         const { oldVal, newVal } = value;
    //         console.log(`\t-${key}: ${oldVal},`);
    //         if (typeof newVal === "object") {
    //             console.log(`\t+${key}: ${JSON.stringify(newVal, null, 4)},`);
    //             continue;
    //         }
    //         console.log(`\t+${key}: ${newVal},`);
    //         continue;
    //     }
    //     console.log(`\t${key}: ${value},`);
    // }
    // if (type === "object") {
    //     console.log("}");
    // }
}
main().catch(console.error);

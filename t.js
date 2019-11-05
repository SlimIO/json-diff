"use strict";

const { readFile } = require("fs").promises;
const jsonDiff = require("./index.js");

/**
 * 
 */
async function main() {
    const json1 = JSON.parse(await readFile("./test/test1.json"));
    const json2 = JSON.parse(await readFile("./test/test2.json"));

    const jsonStr1 = await readFile("./test/test1.json", { encoding: "utf-8" });
    const jsonStr2 = await readFile("./test/test2.json", { encoding: "utf-8" });

    // console.log(jsonStr1);
    // console.log(jsonStr2);

    // console.time("fastjson");
    // const result = fastDiff(jsonStr1, jsonStr2);
    // console.timeEnd("fastjson");

    // console.log(result);

    console.time("json");
    // const { type, result } = jsonDiff(json1, json2);
    jsonDiff(json1, json2);
    console.timeEnd("json");

    // console.log(JSON.stringify(result, null, 4));
}
main().catch(console.error);

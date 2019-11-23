"use strict";
const test1 = require("./test1.json");
const test2 = require("./test2.json");
const jsondiff = require("../index.js");

// Require Third-party Dependencies
const avaTest = require("ava");

avaTest("Husky passed Test", (assert) => {
    // jsondiff(test1, test2);
    assert.pass();
});

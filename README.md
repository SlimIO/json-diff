# Json-diff
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/SlimIO/json-diff/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SlimIO/json-diff/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)
![size](https://img.shields.io/bundlephobia/min/@slimio/json-diff)
![dep](https://img.shields.io/david/SlimIO/json-diff)
![known vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/SlimIO/json-diff)
[![Build Status](https://travis-ci.com/SlimIO/json-diff.svg?branch=master)](https://travis-ci.com/SlimIO/json-diff) [![Greenkeeper badge](https://badges.greenkeeper.io/SlimIO/json-diff.svg)](https://greenkeeper.io/)

Differentiates JSON in you terminal with color.

## Requirements
- [Node.js](https://nodejs.org/en/) v12 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @slimio/json-diff
# or
$ yarn add @slimio/json-diff
```


## Usage example
```js
const jsonDiff = require("@slimio/json-diff");
const json1 = {
    number: 10,
    array: ["x", "y", "z"]
}

const json2 = {
    number: 20,
    array: ["x", "y", "w"]
}

jsonDiff(json1, json2);
```
It will produce the following stdout:

![stdout](https://i.imgur.com/uVqCnqE.png)

## API

### jsonDiff(original: object, diff: object, options?: Options): void
Stdout the difference between two JSON Object. Available options is described by the following TypeScript interface
```ts
interface Options {
    color?: boolean;
}
```

## Dependencies

|Name|Refactoring|Security Risk|Usage|
|---|---|---|---|
|[kleur](https://github.com/lukeed/kleur)|Minor|Low|TTY color|

## License
MIT

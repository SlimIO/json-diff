# Json-diff
![version](https://img.shields.io/badge/version-0.1.0-blue.svg)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SlimIO/is/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)

Differentiates JSON in you terminal with color.

## Requirements
- [Node.js](https://nodejs.org/en/) v10 or higher

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

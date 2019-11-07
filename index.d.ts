interface Options {
    color?: boolean;
}

declare function JSONDiff(objA: any, objB: any, options?: Options): object;

export = JSONDiff;

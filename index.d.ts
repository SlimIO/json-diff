
declare namespace JSONDiff {
    interface Options {
        color?: boolean;
    }

    type JSONKinds = "string" | "number" | "boolean" | "object" | "array" | "mixed";

    interface OldAndNew {
        oldVal: any;
        newVal: any;
    }

    interface Block {
        code: 0 | 1 | -1;
        type: JSONKinds;
        value: JSONKinds | Block | BlockObject | OldAndNew;
    }

    interface BlockObject {
        [key: string]: Block | Block[];
    }
}

declare function JSONDiff(objA: object, objB: object, options?: JSONDiff.Options): object;

export = JSONDiff;
export as namespace JSONDiff;

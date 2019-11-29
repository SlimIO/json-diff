
declare namespace JSONDiff {
    interface Options {
        color?: boolean;
    }

    type JSONDiffKinds = "string" | "number" | "boolean" | "object" | "array" | "mixed";

    interface Block {
        code: 0 | 1 | -1;
        type: JSONDiffKinds;
        value: JSONDiffKinds | Block | BlockObject | OldAndNew;
    }

    interface OldAndNew {
        oldVal: JSONDiffKinds;
        newVal: JSONDiffKinds;
    }

    interface BlockObject {
        [key: string]: Block | Block[];
    }

    interface DiffResult {
        type: "object" | "array";
        result: Block[] | BlockObject;
    }
}

declare function JSONDiff(objA: object, objB: object, options?: JSONDiff.Options): JSONDiff.DiffResult;

export = JSONDiff;
export as namespace JSONDiff;

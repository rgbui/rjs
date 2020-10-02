declare namespace Ve.Lang.Util {
    type ListPredict<T> = T | ((item?: any, index?: number, list?: List<T>) => boolean);
    class List<T> {
        private $;
        constructor(...args: T[]);
        push(item: T): number;
        readonly length: number;
        splice(start: number, deleteCount: number, ...items: T[]): this;
        join(separator?: string, predict?: (item: T, i: number, list: List<T>) => string): string;
        reverse(): this;
        /**
         * Sorts an array.
         * @param compareFn Function used to determine the order of the elements. It is expected to return
         * a negative value if first argument is less than second argument, zero if they're equal and a positive
         * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
         * ```ts
         * List[11,2,22,1].sort((a, b) => a - b)
         * ```
         */
        sort(compareFn?: (a: T, b: T) => number): this;
        eq(pos: number): T;
        predicateMatch(item: any, index: number, list: List<T>, predicate: ListPredict<T>): boolean;
        last(): T;
        first(): T;
        toArray<U>(predicate: (item?: T, index?: number, list?: List<T>) => U): List<U>;
        append(a: List<T> | T[] | T, pos?: number): List<T>;
        insertAt(pos: number, a: List<T> | T[] | T): List<T>;
        replaceAt(pos: number, a: T): List<T>;
        appendArray(a: List<any> | any[], pos?: number): List<T>;
        insertArrayAt(pos: number, a: List<any> | any[]): List<T>;
        removeAt(pos: number): List<T>;
        remove(predicate: T | ((item?: any, index?: number, list?: List<T>) => boolean)): List<T>;
        removeAll(predicate: T | ((item?: any, index?: number, list?: List<T>) => boolean)): List<T>;
        removeBefore(predicate: T | ((item?: any, index?: number, list?: List<T>) => boolean), isIncludeFind?: boolean): List<T>;
        removeAfter(predicate: T | ((item?: any, index?: number, list?: List<T>) => boolean), isIncludeFind?: boolean): List<T>;
        exists(predicate: T | ((item?: T, index?: number, list?: List<T>) => boolean)): boolean;
        trueForAll(predicate: T | ((item?: any, index?: number, list?: List<T>) => boolean)): boolean;
        findLast(predicate: T | ((item?: T, index?: number, list?: List<T>) => boolean)): T | null;
        findBefore(indexPredict: ListPredict<T>, predict: ListPredict<T>, isIncludeSelf?: boolean): T;
        findAfter(indexPredict: ListPredict<T>, predict: ListPredict<T>, isIncludeSelf?: boolean): T;
        findSkip(predicate: T | ((item?: T, index?: number, list?: List<T>) => boolean), skip?: number): T;
        findRange(predicate: T | ((item?: T, index?: number, list?: List<T>) => boolean), predicate2: T | ((item?: T, index?: number, list?: List<T>) => boolean)): List<T>;
        findAll(predicate: T | ((item?: T, index?: number, list?: List<T>) => boolean)): List<T>;
        findAt(predicate: T | ((item?: T, index?: number, list?: List<T>) => boolean), defaultIndex?: number): number;
        findLastIndex(predicate: T | ((item?: T, index?: number, list?: List<T>) => boolean), defaultIndex?: number): number;
        forEach(predicate: T | ((item?: T, index?: number, list?: List<T>) => any)): void;
        each(predicate: T | ((item?: T, index?: number, list?: List<T>) => any)): void;
        reach(predicate: T | ((item?: T, index?: number, list?: List<T>) => any)): void;
        recursion(predicate: (item?: T, index?: number, next?: ((index?: number) => void)) => void): void;
        eachReverse(predicate: T | ((item?: T, index?: number, list?: List<T>) => any)): void;
        limit(index: number, size: number): List<T>;
        /***
         * 包含start,end
         */
        range(start: number, end?: number): List<T>;
        split(predicate: T | ((item?: T, index?: number, list?: List<T>) => any)): List<List<T>>;
        matchIndex(regex: string | RegExp, map: (item?: T, index?: number, list?: List<T>) => string, startIndex?: number): number;
        /**
         * 两个集合相减
         */
        subtract(arr: List<T>): List<T>;
        sum(predicate?: T | ((item?: T, index?: number, list?: List<T>) => number)): number;
        match(regex: string | RegExp, map: (item?: any, index?: number, list?: List<T>) => string, startIndex?: number): List<T>;
        copy(): List<T>;
        asArray(): T[];
        treeEach(treeChildName: string, fn: (item: T, deep?: number, index?: number, sort?: number, parent?: T, arr?: List<T>) => (void | {
            break?: boolean;
            continue?: boolean;
            returns?: any;
        }), parent?: T, defaultDeep?: number, defaultIndex?: number): {
            total: number;
            deep: number;
        };
        findIndex(predicate: any, defaultIndex?: number): number;
        find(predicate: any): T;
        map<U>(predicate: (item: T, i: number, list: List<T>) => U): List<U>;
        static isList(t: any): boolean;
        static asList<V>(t: V | V[] | List<V>): List<V>;
        static treeEach<T>(list: List<T>, treeChildName: string, fn: (item: T, deep?: number, index?: number, sort?: number, parent?: any, arr?: List<T>) => (void | {
            break?: boolean;
            continue?: boolean;
            returns?: any;
        }), parent?: any, defaultDeep?: any, defaultIndex?: any): {
            total: any;
            deep: any;
        };
    }
    var _: {
        remove<T>(list: T[], predict: T | ((t: T, index?: number, thisArray?: T[]) => boolean)): void;
        removeAll<T>(list: T[], predict: T | ((t: T, index?: number, thisArray?: T[]) => boolean)): void;
        each<T>(list: T[], predict: (t: T, index?: number, thisArray?: T[]) => boolean): void;
        addRange<T>(list: T[], newArray: T[]): void;
        find<T>(list: T[], predict: (t: T, index?: number, thisArray?: T[]) => boolean): T;
        findIndex<T>(list: T[], predict: T | ((t: T, index?: number, thisArray?: T[]) => boolean)): number;
        exists<T>(list: T[], predict: T | ((t: T, index?: number, thisArray?: T[]) => boolean)): boolean;
        treeEach<T>(list: T[], treeChildName: string, fn: (item: T, deep?: number, index?: number, sort?: number, parent?: any, arr?: any[]) => void | {
            break?: boolean;
            continue?: boolean;
            returns?: any;
        }, parent?: any, defaultDeep?: any, defaultIndex?: any): {
            total: any;
            deep: any;
        };
    };
}
declare namespace Ve.Lang {
    type ArrayOf<T> = T extends (infer p)[] ? p : never;
    type ListOf<T> = T extends Ve.Lang.Util.List<infer p> ? p : never;
}
declare namespace Ve.Lang.Util {
    function Inherit(Mix: any, ...mixins: any[]): any;
    function Mixin(cla: any, baseCla: any, keys: string[]): void;
    function Extend(mix: any, ...mixins: any[]): any;
    function getAvailableName<T>(name: any, list: List<T>, predict: (item: T) => string): any;
    function nullSafe<T>(value: T, def: T): T;
    function getId(): string;
}
declare namespace Ve.Lang.Util {
    class BaseEvent {
        private __$events;
        on(name: string | Record<string, (this: BaseEvent, ...args: any[]) => any>, cb?: (this: BaseEvent, ...args: any[]) => any, isReplace?: boolean): this;
        once(name: string | Record<string, (this: BaseEvent, ...args: any[]) => any>, cb?: (this: BaseEvent, ...args: any[]) => any, isReplace?: boolean): this;
        off(name: string | ((this: BaseEvent, ...args: any[]) => any)): this;
        emit(name: string, ...args: any[]): any;
        in(name: string): boolean;
    }
}
declare namespace Ve.Lang {
    import List = Ve.Lang.Util.List;
    class Token {
        /***列号*/
        col: number;
        size: number;
        row: number;
        value: string;
        childs: List<Token>;
        /***
         * @param name:'root'|'invalid'
         *
         */
        name: string;
        parent?: Token;
        node: Node;
        readonly prev: Token;
        readonly next: Token;
        nextFindAll(predict: (t: Token) => boolean): List<Token>;
        nextFind(predict: (t: Token) => boolean): Token;
        prevExists(predict: (t: Token) => boolean): boolean;
        /***incluse self */
        isPrevMatch(match: string | RegExp | string[] | RegExp[]): boolean;
        prevFlags(): string;
        closest(predict: (t: Token) => boolean, considerSelf?: boolean): Token;
        parents(predict: (t: Token) => boolean, tillPredict?: (t: Token) => boolean): List<Token>;
        get(): Record<string, any>;
        readonly flag: string;
        readonly index: number;
    }
}
declare namespace Ve.Lang {
    class Tokenizer extends Util.BaseEvent {
        constructor();
        private pos;
        private len;
        private code;
        private line;
        private lines;
        private lineCount;
        private row;
        private rootToken;
        private contextToken;
        private contextMode;
        private syntax;
        protected init(): void;
        protected load(syntax?: LangSyntax): void;
        protected createToken(): Token;
        parse(code: string): Token;
        private matchMode();
        private match(code, match);
        private matchInvalid();
        private nextLine();
        private readonly lineIsEol;
        private readonly rowIsEol;
        private llegalTermination();
    }
    interface Tokenizer {
        on(name: 'error', fn: (error: Error | string, pos?: {
            col: number;
            row: number;
        }, token?: Token) => void): any;
    }
}
declare namespace Ve.Lang.Razor {
    /***
     *@for(){}
     *@while(){}
     *@if(){ }else if(){ } else{ }
     *@{}
     *@()
     *
     * 转义符["@@","@)","@}","@#{","@#("]
     *()和{}正常是成双成对，转义符主要用来匹配半个
     * 注释
     * @**@
     *
     **/
    var RazorSyntax: LangSyntax;
    class RazorToken extends Token {
        readonly flag: string;
    }
    class RazorTokenizer extends Tokenizer {
        init(): void;
        createToken(): RazorToken;
    }
}
declare namespace Ve.Lang.Razor {
    class RazorWriter {
        codes: string[];
        writeVariable: string;
        constructor(options?: {
            writeVariable: string;
        });
        private writeCode(text);
        private writeValue(text);
        private writeString(text);
        private writeScope(code);
        scope: 'code' | 'text';
        write(token: Token): void;
        private read(token);
        outputCode(): string;
    }
}
declare namespace Ve.Lang.Razor {
    class RazorTemplate {
        static escape(code: string): string;
        private baseObject;
        compile(code: string, obj: Record<string, any>, ViewBag?: Record<string, any>): any;
        /***
         * 提取对象的所有property name,包括继承的
         */
        private getObjectKeyValues(data);
        private static $rt;
        static compile(code: string, obj: Record<string, any>, ViewBag?: Record<string, any>): any;
    }
}
interface Window {
    RJS: Ve.Lang.Razor.RazorTemplate;
}
declare namespace Ve.Lang {
    /**
     * @link https://microsoft.github.io/monaco-editor/monarch.html
     */
    type LangSyntaxRoot = {
        root: {
            include?: string;
            name?: string;
            match?: string | RegExp | (string[]);
            next?: string;
            nextTurn?: string;
            push?: boolean;
            pop?: boolean;
            action?: (contextToken: Token) => Record<string, any> | void;
        }[];
    };
    type LangSyntax = Record<string, string | (string[]) | RegExp | LangSyntaxRoot['root']> | LangSyntaxRoot;
    function getLangSyntaxRegex(syntax: LangSyntax, r: RegExp | string): any;
    function convertLangSyntax(syntax: LangSyntax): void;
}

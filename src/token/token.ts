///<reference path='../util/list.ts'/>

namespace Ve.Lang {
    import List = Ve.Lang.Util.List;
    export class Token {
        /***列号*/
        col: number;
        size: number;
        row: number;
        value: string;
        childs: List<Token> = new List;
        /***
         * @param name:'root'|'invalid'
         * 
         */
        name: string;
        parent?: Token;
        node: Node;
        get prev(): Token {
            if (this.parent) {
                var index = this.parent.childs.findIndex(x => x === this);
                return this.parent.childs.eq(index - 1);
            }
        }
        get next(): Token {
            if (this.parent) {
                var index = this.parent.childs.findIndex(x => x === this);
                return this.parent.childs.eq(index + 1);
            }
        }
        nextFindAll(predict: (t: Token) => boolean) {
            if (this.parent) {
                var ns = this.parent.childs.findAll((t, i) => i > this.index);
                return ns.findAll(predict);
            }
        }
        nextFind(predict: (t: Token) => boolean) {
            if (this.parent) {
                return this.parent.childs.findAfter(x => x == this, predict);
            }
        }
        prevExists(predict: (t: Token) => boolean) {
            if (this.parent) {
                var index = this.parent.childs.findIndex(x => x == this);
                for (var i = 0; i < index; i++) {
                    if (predict(this.parent.childs.eq(i)) == true) return true;
                }
            }
            return false;
        }
        /***incluse self */
        isPrevMatch(match: string | RegExp | string[] | RegExp[]) {
            if (this.parent) {
                var index = this.parent.childs.findIndex(x => x === this);
                var rs = this.parent.childs.range(0, index);
                var flags = this.prevFlags();
                var mr = (m) => {
                    if (Array.isArray(m)) {
                        for (var i = 0; i < m.length; i++) {
                            var r = mr(m[i]);
                            if (typeof r != 'undefined') return r;
                        }
                    }
                    else if (typeof m == 'string' && m.endsWith(flags)) return flags;
                    else if (m instanceof RegExp) {
                        var t = flags.match(m);
                        if (t && t[0] && (t.index == flags.length - t[0].length)) { return t; }
                    }
                }
                return mr(match) ? true : false;
            }
            return false;
        }
        prevFlags() {
            if (this.parent) {
                var index = this.parent.childs.findIndex(x => x === this);
                var rs = this.parent.childs.range(0, index);
                return rs.map(x => x.flag).join("");
            }
            return '';
        }
        closest(predict: (t: Token) => boolean, considerSelf: boolean = true) {
            var t = considerSelf == true ? this : this.parent;
            while (true) {
                if (predict(t) == true) return t;
                else {
                    t = t.parent;
                    if (!t) return null;
                }
            }
        }
        parents(predict: (t: Token) => boolean, tillPredict?: (t: Token) => boolean) {
            var tokens: List<Token> = new List();
            var t = this.parent;
            while (true) {
                if (!t) break
                if (typeof tillPredict == 'function' && tillPredict(t) == true) break;
                if (predict(t)) {
                    tokens.push(t);
                }
                t = t.parent;
            }
            return tokens;
        }
        get() {
            var json: Record<string, any> = {};
            json.col = this.col;
            json.size = this.size;
            json.row = this.row;
            json.value = this.value;
            json.name = this.name;
            json.childs = this.childs.map(x => x.get());
            return json;
        }
        get flag() {
            return '';
        }
        get index() {
            if (this.parent) {
                return this.parent.childs.findIndex(x => x == this);
            }
        }
    }
}

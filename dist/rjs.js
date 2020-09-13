var Ve;
(function (Ve) {
    var Lang;
    (function (Lang) {
        var Util;
        (function (Util) {
            class List {
                constructor(...args) {
                    this.$ = new Array();
                    if (args.length > 1) {
                        args.forEach(arg => this.push(arg));
                    }
                    else if (args.length == 1) {
                        if (args[0] instanceof List) {
                            args[0].forEach(x => this.push(x));
                        }
                        else if (Array.isArray(args[0])) {
                            args[0].forEach(x => this.push(x));
                        }
                        else
                            this.push(args[0]);
                    }
                }
                push(item) {
                    return this.$.push(item);
                }
                get length() {
                    return this.$.length;
                }
                splice(start, deleteCount, ...items) {
                    this.$.splice(start, deleteCount, ...items);
                    return this;
                }
                join(separator, predict) {
                    if (typeof predict == 'function')
                        return this.map(predict).join(separator);
                    else
                        return this.$.join(separator);
                }
                reverse() {
                    this.$.reverse();
                    return this;
                }
                /**
                 * Sorts an array.
                 * @param compareFn Function used to determine the order of the elements. It is expected to return
                 * a negative value if first argument is less than second argument, zero if they're equal and a positive
                 * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
                 * ```ts
                 * List[11,2,22,1].sort((a, b) => a - b)
                 * ```
                 */
                sort(compareFn) {
                    this.$.sort(compareFn);
                    return this;
                }
                eq(pos) {
                    return this.$[pos];
                }
                predicateMatch(item, index, list, predicate) {
                    if (typeof predicate == 'function') {
                        return predicate(item, index, list);
                    }
                    else
                        return predicate == item;
                }
                last() {
                    return this.eq(this.length - 1);
                }
                first() {
                    return this.eq(0);
                }
                toArray(predicate) {
                    var ve = new List();
                    for (var i = 0; i < this.length; i++) {
                        var r = predicate(this.eq(i), i, this);
                        if (typeof r != typeof undefined) {
                            ve.push(r);
                        }
                    }
                    return ve;
                }
                append(a, pos) {
                    this.insertAt(pos || this.length, a);
                    return this;
                }
                insertAt(pos, a) {
                    if (a instanceof List) {
                        var args = [pos, 0];
                        a.forEach(x => args.push(x));
                        this.splice.apply(this, args);
                    }
                    else if (a instanceof Array) {
                        var args = [pos, 0];
                        a.forEach(x => args.push(x));
                        this.splice.apply(this, args);
                    }
                    else {
                        this.splice(pos, 0, a);
                    }
                    return this;
                }
                replaceAt(pos, a) {
                    this.$[pos] = a;
                    return this;
                }
                appendArray(a, pos) {
                    //将数组添加进来
                    this.insertArrayAt(pos || this.length, a);
                    return this;
                }
                insertArrayAt(pos, a) {
                    //将数组添加到指定位置
                    this.splice(pos, 0, a);
                    return this;
                }
                removeAt(pos) {
                    this.splice(pos, 1);
                    return this;
                }
                remove(predicate) {
                    var i = this.length - 1;
                    for (i; i >= 0; i--) {
                        if (this.predicateMatch(this.eq(i), i, this, predicate) == true) {
                            this.removeAt(i);
                            break;
                        }
                    }
                    return this;
                }
                removeAll(predicate) {
                    var i = this.length - 1;
                    for (i; i >= 0; i--) {
                        if (this.predicateMatch(this.eq(i), i, this, predicate) == true) {
                            this.removeAt(i);
                        }
                    }
                    return this;
                }
                removeBefore(predicate, isIncludeFind) {
                    var index = this.findIndex(predicate);
                    if (isIncludeFind == true)
                        this.removeAll((x, i) => i <= index);
                    else
                        this.removeAll((x, i) => i < index);
                    return this;
                }
                removeAfter(predicate, isIncludeFind) {
                    var index = this.findIndex(predicate);
                    if (isIncludeFind == true)
                        this.removeAll((x, i) => i >= index);
                    else
                        this.removeAll((x, i) => i > index);
                    return this;
                }
                exists(predicate) {
                    return this.findIndex(predicate) >= 0;
                }
                trueForAll(predicate) {
                    for (var i = 0; i < this.length; i++) {
                        if (this.predicateMatch(this.eq(i), i, this, predicate) !== true)
                            return false;
                    }
                    return true;
                }
                findLast(predicate) {
                    for (var i = this.length - 1; i >= 0; i--) {
                        if (this.predicateMatch(this.eq(i), i, this, predicate) == true) {
                            return this.eq(i);
                        }
                    }
                    return null;
                }
                findBefore(indexPredict, predict, isIncludeSelf = false) {
                    var index = this.findIndex(indexPredict);
                    for (let i = 0; i < index - (isIncludeSelf == true ? 0 : 1); i++) {
                        if (this.predicateMatch(this.eq(i), i, this, predict) == true) {
                            return this.eq(i);
                        }
                    }
                    return null;
                }
                findAfter(indexPredict, predict, isIncludeSelf = false) {
                    var index = this.findIndex(indexPredict);
                    for (let i = index + (isIncludeSelf == true ? 0 : 1); i < this.length; i++) {
                        if (this.predicateMatch(this.eq(i), i, this, predict) == true) {
                            return this.eq(i);
                        }
                    }
                    return null;
                }
                findSkip(predicate, skip = 1) {
                    var index = this.findIndex(predicate);
                    return this.eq(index + skip);
                }
                findRange(predicate, predicate2) {
                    var start = this.findIndex(predicate);
                    var end = this.findIndex(predicate2);
                    return this.range(start, end);
                }
                findAll(predicate) {
                    var result = new List();
                    for (var i = 0; i < this.length; i++) {
                        if (this.predicateMatch(this.eq(i), i, this, predicate) == true) {
                            result.push(this.eq(i));
                        }
                    }
                    return result;
                }
                findAt(predicate, defaultIndex) {
                    for (var i = 0; i < this.length; i++) {
                        if (this.predicateMatch(this.eq(i), i, this, predicate) == true) {
                            return i;
                        }
                    }
                    if (typeof defaultIndex == 'number')
                        return defaultIndex;
                    return -1;
                }
                findLastIndex(predicate, defaultIndex) {
                    var i = this.length - 1;
                    for (i; i >= 0; i--) {
                        if (this.predicateMatch(this.eq(i), i, this, predicate) == true) {
                            return i;
                        }
                    }
                    if (typeof defaultIndex == 'number')
                        return defaultIndex;
                    return -1;
                }
                forEach(predicate) {
                    this.each(predicate);
                }
                each(predicate) {
                    for (var i = 0; i < this.length; i++) {
                        if (this.predicateMatch(this.eq(i), i, this, predicate) == false) {
                            break;
                        }
                    }
                }
                reach(predicate) {
                    this.eachReverse(predicate);
                }
                recursion(predicate) {
                    var next = (i) => {
                        if (i < this.length)
                            predicate(this.eq(i), i, next);
                    };
                    predicate(this.eq(0), 0, next);
                }
                eachReverse(predicate) {
                    for (var i = this.length - 1; i >= 0; i--) {
                        if (this.predicateMatch(this.eq(i), i, this, predicate)) {
                            break;
                        }
                    }
                }
                limit(index, size) {
                    if (size <= 0) {
                        return new List();
                    }
                    return this.range(index, index + size - 1);
                }
                /***
                 * 包含start,end
                 */
                range(start, end) {
                    var arr = new List();
                    if (typeof end == typeof undefined)
                        end = this.length;
                    this.each(function (val, i) {
                        if (i >= start && i <= end) {
                            arr.push(val);
                        }
                    });
                    return arr;
                }
                split(predicate) {
                    var list = new List();
                    var gs = new List();
                    var self = this;
                    this.each(function (val, i, arr) {
                        if (self.predicateMatch(val, i, arr, predicate) == true) {
                            if (gs.length > 0)
                                list.appendArray(gs);
                            gs = new List();
                        }
                        else
                            gs.append(val);
                    });
                    if (gs.length > 0)
                        list.appendArray(gs);
                    return list;
                }
                matchIndex(regex, map, startIndex) {
                    if (typeof startIndex == typeof undefined)
                        startIndex = 0;
                    var text = this.findAll((x, i) => i >= startIndex).map(map).join("");
                    if (typeof regex == 'string')
                        regex = new RegExp(regex);
                    var match = text.match(regex);
                    if (match && match.index == 0) {
                        var mt = match[0];
                        var rt = '';
                        for (var i = startIndex; i < this.length; i++) {
                            rt += map(this.eq(i), i, this);
                            if (rt == mt) {
                                return i;
                            }
                        }
                    }
                    return -1;
                }
                /**
                 * 两个集合相减
                 */
                subtract(arr) {
                    return this.findAll(x => !arr.exists(x));
                }
                sum(predicate) {
                    var s = 0;
                    this.each((r, i) => {
                        if (typeof predicate == 'undefined')
                            s += r;
                        else if (typeof predicate == 'function')
                            s += predicate(r, i, this);
                        else
                            s += r;
                    });
                    return s;
                }
                match(regex, map, startIndex) {
                    if (typeof startIndex == typeof undefined)
                        startIndex = 0;
                    var mi = this.matchIndex(regex, map, startIndex);
                    return this.range(startIndex, mi);
                }
                copy() {
                    return this.map(x => x);
                }
                asArray() {
                    var as = new Array();
                    this.each(t => {
                        as.push(t);
                    });
                    return as;
                }
                treeEach(treeChildName, fn, parent, defaultDeep, defaultIndex) {
                    var maxDeep = defaultDeep == undefined ? 0 : defaultDeep;
                    var index = defaultIndex == undefined ? 0 : defaultIndex;
                    var isBreak = false;
                    var fc = function (arr, deep, parent) {
                        if (deep > maxDeep) {
                            maxDeep = deep;
                        }
                        var sort = 0;
                        arr.each(function (a) {
                            if (isBreak) {
                                return false;
                            }
                            var r = fn(a, deep, index, sort, parent, arr);
                            if (r && r.break == true) {
                                isBreak = true;
                            }
                            if (isBreak) {
                                return false;
                            }
                            if (r && r.continue == true) {
                                return;
                            }
                            index += 1;
                            sort += 1;
                            if (a && a[treeChildName] && a[treeChildName].length > 0) {
                                fc(a[treeChildName], deep + 1, r && r.returns ? r.returns : undefined);
                            }
                        });
                    };
                    fc(this, maxDeep, parent);
                    return { total: index, deep: maxDeep };
                }
                findIndex(predicate, defaultIndex) {
                    for (var i = 0; i < this.length; i++) {
                        if (this.predicateMatch(this.eq(i), i, this, predicate) == true) {
                            return i;
                        }
                    }
                    if (typeof defaultIndex == 'number')
                        return defaultIndex;
                    return -1;
                }
                find(predicate) {
                    for (let i = 0; i < this.length; i++) {
                        if (this.predicateMatch(this.eq(i), i, this, predicate) == true) {
                            return this.eq(i);
                        }
                    }
                    return null;
                }
                map(predicate) {
                    var ve = new List();
                    for (var i = 0; i < this.length; i++) {
                        var r = predicate(this.eq(i), i, this);
                        if (typeof r != typeof undefined) {
                            ve.push(r);
                        }
                    }
                    return ve;
                }
                static isList(t) {
                    return t instanceof List;
                }
                static asList(t) {
                    if (t instanceof List)
                        return t;
                    else
                        return new List(t);
                }
                static treeEach(list, treeChildName, fn, parent, defaultDeep, defaultIndex) {
                    var maxDeep = defaultDeep == undefined ? 0 : defaultDeep;
                    var index = defaultIndex == undefined ? 0 : defaultIndex;
                    var isBreak = false;
                    var fc = function (arr, deep, parent) {
                        if (deep > maxDeep) {
                            maxDeep = deep;
                        }
                        var sort = 0;
                        arr.forEach(function (a) {
                            if (isBreak) {
                                return false;
                            }
                            var r = fn(a, deep, index, sort, parent, arr);
                            if (r && r.break == true) {
                                isBreak = true;
                            }
                            if (isBreak) {
                                return false;
                            }
                            if (r && r.continue == true) {
                                return;
                            }
                            index += 1;
                            sort += 1;
                            if (a && a[treeChildName] && a[treeChildName].length > 0) {
                                fc(a[treeChildName], deep + 1, r && r.returns ? r.returns : undefined);
                            }
                        });
                    };
                    fc(list, maxDeep, parent);
                    return { total: index, deep: maxDeep };
                }
            }
            Util.List = List;
            Util._ = {
                remove(list, predict) {
                    var index = this.findIndex(list, predict);
                    if (index > -1)
                        list.splice(index, 1);
                },
                removeAll(list, predict) {
                    for (let i = list.length - 1; i >= 0; i--) {
                        if (typeof predict == 'function') {
                            var r = predict(list[i], i, list);
                            if (r == true)
                                list.splice(i, 1);
                        }
                        else if (predict === list[i]) {
                            list.splice(i, 1);
                        }
                    }
                },
                each(list, predict) {
                    for (let i = 0; i < list.length; i++) {
                        let data = list[i];
                        if (typeof predict == 'function') {
                            var result = predict(data, i, list);
                            if (result == false)
                                break;
                        }
                    }
                },
                addRange(list, newArray) {
                    newArray.forEach(t => list.push(t));
                },
                find(list, predict) {
                    for (let i = 0; i < list.length; i++) {
                        if (typeof predict == 'function') {
                            var r = predict(list[i], i, list);
                            if (r == true)
                                return list[i];
                        }
                    }
                },
                findIndex(list, predict) {
                    for (let i = 0; i < list.length; i++) {
                        if (typeof predict == 'function') {
                            var r = predict(list[i], i, list);
                            if (r == true)
                                return i;
                        }
                        else if (predict === list[i]) {
                            return i;
                        }
                    }
                },
                exists(list, predict) {
                    return this.findIndex(list, predict) > -1 ? true : false;
                },
                treeEach(list, treeChildName, fn, parent, defaultDeep, defaultIndex) {
                    var maxDeep = defaultDeep == undefined ? 0 : defaultDeep;
                    var index = defaultIndex == undefined ? 0 : defaultIndex;
                    var isBreak = false;
                    var fc = function (arr, deep, parent) {
                        if (deep > maxDeep) {
                            maxDeep = deep;
                        }
                        var sort = 0;
                        arr.forEach(function (a) {
                            if (isBreak) {
                                return false;
                            }
                            var r = fn(a, deep, index, sort, parent, arr);
                            if (r && r.break == true) {
                                isBreak = true;
                            }
                            if (isBreak) {
                                return false;
                            }
                            if (r && r.continue == true) {
                                return;
                            }
                            index += 1;
                            sort += 1;
                            if (a && Array.isArray(a[treeChildName])) {
                                fc(a[treeChildName], deep + 1, r && r.returns ? r.returns : undefined);
                            }
                        });
                    };
                    fc(list, maxDeep, parent);
                    return { total: index, deep: maxDeep };
                }
            };
        })(Util = Lang.Util || (Lang.Util = {}));
    })(Lang = Ve.Lang || (Ve.Lang = {}));
})(Ve || (Ve = {}));
var Ve;
(function (Ve) {
    var Lang;
    (function (Lang) {
        var Util;
        (function (Util) {
            function Inherit(Mix, ...mixins) {
                function copyProperties(target, source) {
                    for (let key of Reflect.ownKeys(source)) {
                        if (key !== "constructor"
                            && key !== "prototype"
                            && key !== "name") {
                            let desc = Object.getOwnPropertyDescriptor(source, key);
                            Object.defineProperty(target, key, desc);
                        }
                    }
                }
                for (let mixin of mixins) {
                    copyProperties(Mix, mixin);
                    copyProperties(Mix.prototype, mixin.prototype);
                }
                return Mix;
            }
            Util.Inherit = Inherit;
            function Mixin(cla, baseCla, keys) {
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i];
                    var desc = Object.getOwnPropertyDescriptor(baseCla, key);
                    if (!desc)
                        desc = Object.getOwnPropertyDescriptor(baseCla.prototype, key);
                    if (desc)
                        Object.defineProperty(cla, key, desc);
                    else
                        console.log(desc, baseCla, key);
                }
            }
            Util.Mixin = Mixin;
            function Extend(mix, ...mixins) {
                mixins.forEach(mi => {
                    for (var n in mi) {
                        mix[n] = mi[n];
                    }
                });
                return mix;
            }
            Util.Extend = Extend;
            function getAvailableName(name, list, predict) {
                var i = 0;
                while (true) {
                    var text = name + (i == 0 ? "" : i);
                    if (list.exists(z => predict(z) == text)) {
                        i++;
                    }
                    else {
                        break;
                    }
                }
                return name + (i == 0 ? "" : i);
            }
            Util.getAvailableName = getAvailableName;
            function nullSafe(value, def) {
                return value === null || value === undefined ? def : value;
            }
            Util.nullSafe = nullSafe;
            let counter = 0;
            function getId() {
                return (counter += 1).toString();
            }
            Util.getId = getId;
        })(Util = Lang.Util || (Lang.Util = {}));
    })(Lang = Ve.Lang || (Ve.Lang = {}));
})(Ve || (Ve = {}));
var Ve;
(function (Ve) {
    var Lang;
    (function (Lang) {
        var Util;
        (function (Util) {
            class BaseEvent {
                constructor() {
                    this.__$events = new Util.List();
                }
                on(name, cb, isReplace) {
                    if (typeof name == 'object') {
                        for (var n in name)
                            this.on(n, name[n]);
                        return;
                    }
                    else {
                        var ev = this.__$events.find(x => x.name == name);
                        if (isReplace == true && ev) {
                            Util.Extend(ev, { name, cb });
                        }
                        else {
                            this.__$events.push({ name, cb });
                        }
                    }
                    return this;
                }
                once(name, cb, isReplace) {
                    if (typeof name == 'object') {
                        for (var n in name)
                            this.once(n, name[n]);
                        return;
                    }
                    else {
                        var ev = this.__$events.find(x => x.name == name);
                        if (isReplace == true && ev) {
                            Util.Extend(ev, { name, cb, once: true });
                        }
                        else {
                            this.__$events.push({ name, cb, once: true });
                        }
                    }
                    return this;
                }
                off(name) {
                    if (typeof name == 'string') {
                        this.__$events.removeAll(x => x.name == name);
                    }
                    else if (typeof name == 'function') {
                        this.__$events.removeAll(x => x.cb == name);
                    }
                    return this;
                }
                emit(name, ...args) {
                    var ev = this.__$events.find(x => typeof name == 'string' && x.name == name);
                    if (ev) {
                        var result = ev.cb.apply(this, args);
                        if (ev.once == true)
                            this.__$events.remove(ev);
                        return result;
                    }
                }
                in(name) {
                    return this.__$events.find(x => x.name == name) ? true : false;
                }
            }
            Util.BaseEvent = BaseEvent;
        })(Util = Lang.Util || (Lang.Util = {}));
    })(Lang = Ve.Lang || (Ve.Lang = {}));
})(Ve || (Ve = {}));
///<reference path='../util/list.ts'/>
var Ve;
(function (Ve) {
    var Lang;
    (function (Lang) {
        var List = Ve.Lang.Util.List;
        class Token {
            constructor() {
                this.childs = new List;
            }
            get prev() {
                if (this.parent) {
                    var index = this.parent.childs.findIndex(x => x === this);
                    return this.parent.childs.eq(index - 1);
                }
            }
            get next() {
                if (this.parent) {
                    var index = this.parent.childs.findIndex(x => x === this);
                    return this.parent.childs.eq(index + 1);
                }
            }
            nextFindAll(predict) {
                if (this.parent) {
                    var ns = this.parent.childs.findAll((t, i) => i > this.index);
                    return ns.findAll(predict);
                }
            }
            nextFind(predict) {
                if (this.parent) {
                    return this.parent.childs.findAfter(x => x == this, predict);
                }
            }
            prevExists(predict) {
                if (this.parent) {
                    var index = this.parent.childs.findIndex(x => x == this);
                    for (var i = 0; i < index; i++) {
                        if (predict(this.parent.childs.eq(i)) == true)
                            return true;
                    }
                }
                return false;
            }
            /***incluse self */
            isPrevMatch(match) {
                if (this.parent) {
                    var index = this.parent.childs.findIndex(x => x === this);
                    var rs = this.parent.childs.range(0, index);
                    var flags = this.prevFlags();
                    var mr = (m) => {
                        if (Array.isArray(m)) {
                            for (var i = 0; i < m.length; i++) {
                                var r = mr(m[i]);
                                if (typeof r != 'undefined')
                                    return r;
                            }
                        }
                        else if (typeof m == 'string' && m.endsWith(flags))
                            return flags;
                        else if (m instanceof RegExp) {
                            var t = flags.match(m);
                            if (t && t[0] && (t.index == flags.length - t[0].length)) {
                                return t;
                            }
                        }
                    };
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
            closest(predict, considerSelf = true) {
                var t = considerSelf == true ? this : this.parent;
                while (true) {
                    if (predict(t) == true)
                        return t;
                    else {
                        t = t.parent;
                        if (!t)
                            return null;
                    }
                }
            }
            parents(predict, tillPredict) {
                var tokens = new List();
                var t = this.parent;
                while (true) {
                    if (!t)
                        break;
                    if (typeof tillPredict == 'function' && tillPredict(t) == true)
                        break;
                    if (predict(t)) {
                        tokens.push(t);
                    }
                    t = t.parent;
                }
                return tokens;
            }
            get() {
                var json = {};
                json.col = this.col;
                json.size = this.size;
                json.row = this.row;
                json.value = this.value;
                json.name = this.name;
                json.childs = this.childs.map(x => x.get());
                return json;
            }
            get flag() {
                var cmap = {
                    '《=': "<=",
                    '》=': ">=",
                    '！=': "!=",
                    '-》': "->",
                    '、': "/",
                    '！': "!",
                    "？": "?",
                    "：": ":",
                    "、=": "/=",
                    "。。。": "...",
                    "？？": "??",
                    "？。": "?.",
                    "。。": "..",
                    "《": "<",
                    "》": ">",
                    "（": "(",
                    "【": "]",
                    "）": ")",
                    "】": "]",
                    "，": ",",
                    "；": ";",
                    "。": ".",
                };
                var self = this;
                var gv = () => {
                    if (typeof cmap[self.value] == 'string')
                        return cmap[self.value];
                    return self.value;
                };
                if (this.name == 'operators') {
                    return gv();
                }
                else if (this.name == 'keywords') {
                    if (['any', 'Any', 'bool', 'Bool', 'number', 'Number', 'string', 'String', 'double', 'Double', 'Int', 'int',
                        'Object', 'Array', 'Date'].find(x => x == this.value) ? true : false)
                        return 'type';
                    return gv();
                }
                else if (this.name == 'delimiter') {
                    return gv();
                }
                else if (this.name.startsWith('comment')) {
                    return 'comment';
                }
                else if (this.name.startsWith('string')) {
                    if (this.name == 'string.single.open' || this.name == 'string.double.open')
                        return '"';
                    else if (this.name == 'string.single.close' || this.name == 'string.double.close')
                        return '\'';
                    else if (this.name == 'string.escape')
                        return 'escape';
                    else if (this.name == 'string.variable')
                        return 'variable';
                    else if (this.name == 'string.template.open')
                        return '@{';
                    else if (this.name == 'string.template.close')
                        return '}';
                    return 'string';
                }
                else if (this.name.startsWith('number')) {
                    return 'number';
                }
                else if (this.name.startsWith('white')) {
                    return 'space';
                }
                else if (this.name == 'line') {
                    return 'line';
                }
                else if (this.name == 'bracket.open' || this.name == 'bracket.close') {
                    return gv();
                }
                else if (this.name.startsWith('generic')) {
                    if (this.name == 'generic.type')
                        return 'word';
                    else
                        return gv();
                }
                else if (this.name == 'word')
                    return this.name;
            }
            get index() {
                if (this.parent) {
                    return this.parent.childs.findIndex(x => x == this);
                }
            }
        }
        Lang.Token = Token;
    })(Lang = Ve.Lang || (Ve.Lang = {}));
})(Ve || (Ve = {}));
///<reference path='../util/list.ts'/>
///<reference path='../util/declare.ts'/>
///<reference path='../util/common.ts'/>
///<reference path='../util/event.ts'/>
///<reference path='token.ts'/>
var Ve;
(function (Ve) {
    var Lang;
    (function (Lang) {
        class Tokenizer extends Lang.Util.BaseEvent {
            constructor() {
                super();
                this.pos = 0;
                this.len = 0;
                this.code = '';
                this.line = '';
                this.lineCount = 0;
                this.row = 0;
                this.init();
            }
            init() {
                this.load();
            }
            load(syntax) {
                this.syntax = syntax;
            }
            createToken() {
                return new Lang.Token();
            }
            parse(code) {
                if (typeof code != 'string')
                    return this.emit('error', new Error('the tokenizer code require string'));
                this.pos = 0;
                this.row = 0;
                this.code = code;
                this.lines = this.code.split(/\r\n|\n|\r/g);
                this.lineCount = this.lines.length;
                this.line = this.lines[this.row];
                this.len = this.line.length;
                this.contextToken = this.rootToken = this.createToken();
                this.contextToken.row = this.contextToken.col = 0;
                this.contextToken.name = 'root';
                while (!(this.lineIsEol && this.rowIsEol)) {
                    var pos = this.pos;
                    var row = this.row;
                    this.matchMode();
                    this.nextLine();
                    /**
                     * 没有区配到任意的token ,则转到非法的token
                     * */
                    if (this.pos == pos && row === this.row)
                        this.matchInvalid();
                }
                this.llegalTermination();
                return this.rootToken;
            }
            matchMode() {
                var rest = this.line.slice(this.pos);
                if (rest == '' || rest.length == 0)
                    return;
                var matchText;
                if (!this.contextMode) {
                    this.contextMode = this.syntax['root'];
                }
                var mode = this.contextMode.find(x => {
                    var r = this.match(rest, x.match);
                    if (typeof r != 'undefined') {
                        matchText = r;
                        return true;
                    }
                    return false;
                });
                mode = Object.assign({}, mode);
                var beforeMode = (mode, token) => {
                    if (typeof mode.action == 'function') {
                        var newMode = mode.action(this.contextToken);
                        if (typeof newMode != 'undefined') {
                            for (var n in newMode) {
                                if (typeof newMode[n] != 'undefined')
                                    mode[n] = newMode[n];
                            }
                        }
                    }
                    if (mode.nextTurn && mode.nextTurn.startsWith('@')) {
                        this.contextMode = this.syntax[mode.nextTurn.replace('@', '')];
                        if (!this.contextMode) {
                            this.emit('error', new Error(`没有找到转向处理"${mode.nextTurn}"`), { col: token.pos, row: token.row }, token);
                        }
                        else {
                            this.matchMode();
                            return true;
                        }
                    }
                    if (mode.pop == true) {
                        if (this.contextToken.parent)
                            this.contextToken = this.contextToken.parent;
                        else {
                            this.emit('error', new Error(`没有找到字符"${token.value}"的启始字符`), { col: token.pos, row: token.row }, token);
                        }
                    }
                };
                var afterMode = (mode, token) => {
                    if (mode.push == true) {
                        this.contextToken = token;
                    }
                    if (mode.next && mode.next.startsWith('@')) {
                        this.contextMode = this.syntax[mode.next.replace('@', '')];
                        if (!this.contextMode) {
                            throw 'not found turn :' + mode.next;
                        }
                    }
                };
                if (matchText && mode) {
                    var token = this.createToken();
                    token.value = matchText;
                    token.size = matchText.length;
                    token.col = this.pos;
                    token.row = this.row;
                    token.name = mode.name;
                    if (beforeMode(mode, token) == true)
                        return;
                    token.parent = this.contextToken;
                    this.contextToken.childs.push(token);
                    this.pos += matchText.length;
                    afterMode(mode, token);
                }
                else {
                    //如果什么都没匹配到，则需要查询match等于空的情况
                    mode = this.contextMode.find(x => typeof x.match == 'undefined' ? true : false);
                    if (mode && beforeMode(mode, undefined) == true)
                        return;
                    this.emit('error', new Error(`the code "${rest}" is not found tokernizer match at row ${this.row} col ${this.pos}`), { col: this.pos, row: this.row });
                }
            }
            match(code, match) {
                if (Array.isArray(match)) {
                    /***排序，如果匹配多个时，先从长的文本串开始 */
                    match.sort((x, y) => {
                        if (typeof x == 'string' && typeof y == 'string') {
                            if (x.length > y.length)
                                return -1;
                            else
                                return 1;
                        }
                        return 0;
                    });
                    for (var i = 0; i < match.length; i++) {
                        var m = this.match(code, match[i]);
                        if (typeof m != 'undefined')
                            return m;
                    }
                    return undefined;
                }
                else if (match instanceof RegExp) {
                    var r = code.match(match);
                    if (r && r[0] && r.index == 0)
                        return r[0];
                }
                else if (typeof match == 'string') {
                    if (code.startsWith(match))
                        return match;
                }
                else
                    return undefined;
            }
            matchInvalid() {
                var invalidToken = this.createToken();
                invalidToken.col = this.pos;
                invalidToken.row = this.row;
                invalidToken.value = this.line.charAt(this.pos);
                invalidToken.name = 'invalid';
                this.emit('error', new Error('invalid token'), { col: this.pos, row: this.row, token: invalidToken });
                if (this.contextToken) {
                    invalidToken.parent = this.contextToken;
                    this.contextToken.childs.push(invalidToken);
                }
                this.pos += 1;
            }
            nextLine() {
                if (this.lineIsEol) {
                    while (true) {
                        if (this.row < this.lineCount - 1) {
                            //如果不是当前最后一行，需要填加一个行的token
                            var token = this.createToken();
                            token.value = '\n';
                            token.col = this.pos + 1;
                            token.row = this.row;
                            token.name = 'line';
                            token.size = token.value.length;
                            if (this.contextToken) {
                                token.parent = this.contextToken;
                                this.contextToken.childs.push(token);
                            }
                        }
                        if (this.lineCount == this.row + 1)
                            return false;
                        this.row += 1;
                        this.line = this.lines[this.row];
                        this.pos = 0;
                        this.len = this.line.length;
                        //如果当前的行是空字符串，那么继续
                        if (this.line !== '')
                            return true;
                    }
                }
                return false;
            }
            get lineIsEol() {
                return this.len <= this.pos;
            }
            get rowIsEol() {
                return this.row == this.lines.length - 1;
            }
            llegalTermination() {
                if (this.contextToken && this.contextToken.name != 'root') {
                    this.emit('error', new Error(`not match context open:"${this.contextToken.value}" at row:${this.contextToken.row} col:${this.contextToken.col}`), { col: this.contextToken.col, row: this.contextToken.row, token: this.contextToken });
                }
            }
        }
        Lang.Tokenizer = Tokenizer;
    })(Lang = Ve.Lang || (Ve.Lang = {}));
})(Ve || (Ve = {}));
///<reference path='../token/tokenizer.ts'/>
var Ve;
(function (Ve) {
    var Lang;
    (function (Lang) {
        var Razor;
        (function (Razor) {
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
            Razor.RazorSyntax = {
                root: [
                    { name: 'text', match: /[^@\(\)\{\} \t]+/ },
                    { match: /@[ \t]*if[ \t]*\(/, name: 'if', push: true },
                    { match: /@[ \t]*(for|while)[ \t]*\(/, name: 'forwhile', push: true },
                    { match: ['@@', '@)', '@#{', '@}', "@#("], name: 'escape' },
                    { match: /@\(/, name: 'bracket.value.open', push: true },
                    { match: /@\{/, name: 'bracket.block.open', push: true },
                    { match: /@([a-zA-Z_\$\u4E00-\u9FA5][a-zA-Z_\$\u4E00-\u9FA5\d]*)([ \t]*\.[ \t]*[a-zA-Z_\$\u4E00-\u9FA5][a-zA-Z_\$\u4E00-\u9FA5\d]*)*[ \t]*\(/, push: true, name: 'method.open' },
                    { match: /@([a-zA-Z_\$\u4E00-\u9FA5][a-zA-Z_\$\u4E00-\u9FA5\d]*)([ \t]*\.[ \t]*[a-zA-Z_\$\u4E00-\u9FA5][a-zA-Z_\$\u4E00-\u9FA5\d]*)*/, name: 'variable' },
                    { match: /\(/, name: 'bracket.open', push: true },
                    { match: /\{/, name: 'bracket.big.open', push: true },
                    { match: /@\*/, next: '@comment', name: 'comment.open', push: true },
                    {
                        match: ')',
                        name: 'bracket.close',
                        pop: true,
                        action(contextToken) {
                            if (contextToken.name == 'if' || contextToken.name == 'elseif') {
                                return {
                                    next: '@if'
                                };
                            }
                        }
                    },
                    {
                        match: '}',
                        name: 'bracket.big.close',
                        pop: true,
                        action(contextToken) {
                            if (contextToken.isPrevMatch(/(if\(\)|elseif\(\))[s|n]*\{$/)) {
                                return {
                                    next: '@if'
                                };
                            }
                        }
                    },
                    { name: 'text', match: /@/ },
                    { name: "white", match: /[ \t]+/ }
                ],
                if: [
                    {
                        name: 'bracket.if',
                        match: '{',
                        push: true,
                        next: '@root',
                        action(contextToken) {
                            if (!['if', 'elseif'].includes(contextToken.name))
                                return {
                                    nextTurn: '@root'
                                };
                        }
                    },
                    { name: 'elseif', match: /[ \t]*else[ \t]+if[ \t]*\(/, push: true },
                    { name: 'else', match: /[ \t]*else[ \t]*\{/, push: true },
                    { name: 'if.end', nextTurn: '@root' }
                ],
                comment: [
                    { match: /[^@\*]+/, name: 'comment' },
                    { match: /\*@/, name: 'comment.end', pop: true, next: '@root' },
                    { match: /[@\*]/, name: 'comment' }
                ]
            };
            class RazorToken extends Lang.Token {
                get flag() {
                    if (this.name == 'line')
                        return 'n';
                    else if (this.name == 'text')
                        return 'text';
                    else if (this.name == 'if')
                        return 'if(';
                    else if (this.name == 'elseif')
                        return 'elseif(';
                    else if (this.name == 'forwhile')
                        return 'for(';
                    else if (this.name == 'else')
                        return 'else{';
                    else if (this.name == 'bracket.if')
                        return '{';
                    else if (this.name.startsWith('comment'))
                        return 'c';
                    else if (this.name == 'bracket.open')
                        return '(';
                    else if (this.name == 'bracket.close')
                        return ')';
                    else if (this.name == 'bracket.big.open')
                        return '{';
                    else if (this.name == 'bracket.big.close')
                        return '}';
                    else if (this.name == 'bracket.value.open')
                        return '#(';
                    else if (this.name == 'bracket.block.open')
                        return '#{';
                    else if (this.name == 'escape')
                        return 'e';
                    else if (this.name == 'method.open')
                        return '#method(';
                    else if (this.name == 'variable')
                        return '#varibale';
                    else if (this.name == 'white')
                        return 's';
                    return this.name;
                }
            }
            Razor.RazorToken = RazorToken;
            class RazorTokenizer extends Lang.Tokenizer {
                init() {
                    this.load(Razor.RazorSyntax);
                }
                createToken() {
                    return new RazorToken();
                }
            }
            Razor.RazorTokenizer = RazorTokenizer;
        })(Razor = Lang.Razor || (Lang.Razor = {}));
    })(Lang = Ve.Lang || (Ve.Lang = {}));
})(Ve || (Ve = {}));
var Ve;
(function (Ve) {
    var Lang;
    (function (Lang) {
        var Razor;
        (function (Razor) {
            let Variable_COUNTER = 0;
            class RazorWriter {
                constructor(options) {
                    this.scope = 'text';
                    if (typeof options == 'object') {
                        if (typeof options.writeVariable != 'undefined') {
                            this.writeVariable = options.writeVariable;
                        }
                    }
                    if (typeof this.writeVariable == 'undefined')
                        this.writeVariable = `__$$rt${++Variable_COUNTER}`;
                    this.codes = [`\nvar ${this.writeVariable}=[];\n`];
                }
                writeCode(text) {
                    this.codes.push(text);
                }
                writeValue(text) {
                    if (typeof text == 'undefined' || text == null || text === '')
                        return;
                    this.codes.push(`\n${this.writeVariable}.push(${text});\n`);
                }
                writeString(text) {
                    text = text.replace(/(\n|"|\\|\t|\r)/g, function ($0, $1) {
                        switch ($1) {
                            case '\n':
                                return '\\n';
                            case '"':
                                return "\\\"";
                            case '\\':
                                return '\\\\';
                            case '\t':
                                return '\\t';
                            case '\r':
                                return '\\\r';
                        }
                        return $0;
                    });
                    this.codes.push(`\n${this.writeVariable}.push(\"${text}\");\n`);
                }
                writeScope(code) {
                    if (this.scope == 'code')
                        this.writeCode(code);
                    else if (this.scope == 'text')
                        this.writeString(code);
                }
                write(token) {
                    if (token.name == 'root') {
                        token.childs.each(token => {
                            this.write(token);
                        });
                    }
                    else if (token.name.startsWith('comment')) {
                    }
                    else if (token.name == 'escape') {
                        var value = token.value;
                        if (value == '@@')
                            value = '@';
                        else if (value == '@#{')
                            value = '{';
                        else if (value == '@#(')
                            value = '(';
                        else if (value == '@}')
                            value = '}';
                        else if (value == '@)')
                            value = ')';
                        this.writeScope(value);
                    }
                    else if (token.name == 'if' || token.name == 'elseif') {
                        this.writeCode(token.name == 'if' ? 'if' : 'else if');
                        this.scope = 'code';
                        this.writeCode('(');
                        token.childs.each(token => {
                            this.write(token);
                        });
                        this.writeCode(')');
                        this.scope = 'code';
                    }
                    else if (token.name == 'else' || token.name == 'bracket.if') {
                        if (token.name == 'else')
                            this.writeCode('else');
                        this.scope = 'text';
                        this.writeCode('{');
                        token.childs.each(token => {
                            this.write(token);
                        });
                        this.writeCode('}');
                        this.scope = 'code';
                    }
                    else if (token.name == 'forwhile') {
                        if (token.name.indexOf('for') > -1)
                            this.writeCode('for');
                        else
                            this.writeCode('while');
                        this.scope = 'code';
                        this.writeCode('(');
                        token.childs.each(token => { this.write(token); });
                        this.writeCode(')');
                        this.scope = 'code';
                    }
                    else if (token.name == 'method.open') {
                        this.scope = 'code';
                        this.writeValue(`${token.value.replace(/[@\t ]+/g, '')}${this.read(token.childs)})`);
                        this.scope = 'text';
                    }
                    else if (token.name == 'variable') {
                        this.scope = 'text';
                        this.writeValue(`${token.value.replace(/[@ \t]+/, '')}`);
                        this.scope = 'text';
                    }
                    else if (token.name == 'bracket.value.open') {
                        /***@(value)*/
                        this.scope = 'text';
                        this.writeValue(`${this.read(token.childs)}`);
                        this.scope = 'text';
                    }
                    else if (token.name == 'bracket.block.open') {
                        /***@{} */
                        this.scope = 'code';
                        token.childs.each(t => { this.write(t); });
                        this.scope = 'text';
                    }
                    else if (token.name == 'bracket.open') {
                        this.writeScope(token.value);
                        token.childs.each(t => {
                            this.write(t);
                        });
                        this.writeScope(')');
                    }
                    else if (token.name == 'bracket.big.open') {
                        /****主要区分{来源于@forwhile还是普通的{}*/
                        if (token.isPrevMatch(/(for\(\)|if\(\)|elseif\(\))[s|n]*\{$/)) {
                            this.writeCode('{');
                            this.scope = 'text';
                            token.childs.each(t => {
                                this.write(t);
                            });
                            this.scope = 'text';
                            this.writeCode('}');
                        }
                        else {
                            this.writeScope(token.value);
                            token.childs.each(t => {
                                this.write(t);
                            });
                            this.writeScope('}');
                        }
                    }
                    else if (token.name == 'text') {
                        this.writeScope(token.value);
                    }
                    else if (token.name == 'line' || token.name == 'white') {
                        if (!token.isPrevMatch(/(for\(\)|if\(\)|elseif\(\))([s|n]*\{\})?[s|n]*$/))
                            this.writeScope(token.value);
                    }
                    else if (token.name == 'bracket.close' || token.name == 'bracket.big.close') {
                    }
                }
                read(token) {
                    if (token instanceof Lang.Util.List)
                        return token.map(t => this.read(t)).join("");
                    else
                        return token.value + this.read(token.childs);
                }
                outputCode() {
                    return this.codes.join('') + `\nreturn ${this.writeVariable}.join("");\n`;
                }
            }
            Razor.RazorWriter = RazorWriter;
        })(Razor = Lang.Razor || (Lang.Razor = {}));
    })(Lang = Ve.Lang || (Ve.Lang = {}));
})(Ve || (Ve = {}));
//<reference path='syntax.ts'/>
///<reference path='writer.ts'/>
var Ve;
(function (Ve) {
    var Lang;
    (function (Lang) {
        var Razor;
        (function (Razor) {
            class RazorTemplate {
                static escape(code) {
                    return code.replace(/@(?![@])/g, "@@");
                }
                static compile(code, obj, ViewBag) {
                    if (typeof ViewBag == 'undefined')
                        ViewBag = {};
                    var tokenizer = new Razor.RazorTokenizer();
                    var token = tokenizer.parse(code);
                    var writer = new Razor.RazorWriter();
                    writer.write(token);
                    var jsCode = writer.outputCode();
                    /****
                     * 扩展默认系统的对象与方法
                     * 如@include('~/views/index.rjs')
                     *
                     */
                    var baseObj = {};
                    var baseMaps = this.getObjectKeyValues(baseObj);
                    var maps = this.getObjectKeyValues(obj);
                    maps = [...maps, ...baseMaps];
                    var funCode = `function(ViewBag,...args)
            {
                 function innerFun(${maps.map(x => x.key).join(",")})
                 {
                     ${jsCode}
                 };
                 return innerFun.apply(this,args);
            }`;
                    try {
                        var gl = typeof window == 'undefined' ? global : window;
                        var fun = gl.eval(`(${funCode})`);
                        return fun.apply(obj, [ViewBag, ...maps.map(x => x.value)]);
                    }
                    catch (e) {
                        console.log(funCode);
                        throw e;
                    }
                }
                /***
                 * 提取对象的所有property name,包括继承的
                 */
                static getObjectKeyValues(data) {
                    var prototypes = [];
                    var current = data.__proto__;
                    while (true) {
                        if (current === Object.prototype) {
                            break;
                        }
                        else {
                            prototypes.push(current);
                            current = current.__proto__;
                            if (!current)
                                break;
                        }
                    }
                    var keys = [];
                    for (var n in data) {
                        if (!Ve.Lang.Util._.exists(keys, n))
                            keys.push(n);
                    }
                    prototypes.forEach(pro => {
                        var ps = Reflect.ownKeys(pro);
                        Ve.Lang.Util._.remove(ps, 'constructor');
                        ps.forEach(m => { if (!Ve.Lang.Util._.exists(keys, m))
                            keys.push(m); });
                    });
                    var maps = [];
                    keys.forEach(key => {
                        (function (key) {
                            var map = { key };
                            if (typeof data[key] == 'function') {
                                map.value = function () {
                                    return data[key].apply(data, arguments);
                                };
                            }
                            else
                                map.value = data[key];
                            maps.push(map);
                        })(key);
                    });
                    return maps;
                }
            }
            Razor.RazorTemplate = RazorTemplate;
        })(Razor = Lang.Razor || (Lang.Razor = {}));
    })(Lang = Ve.Lang || (Ve.Lang = {}));
})(Ve || (Ve = {}));
///<reference path='token.ts'/>
var Ve;
(function (Ve) {
    var Lang;
    (function (Lang) {
        function getLangSyntaxRegex(syntax, r) {
            if (r instanceof RegExp) {
                var rs = r.toString();
                var rm = rs.match(/(@[a-zA-Z\d\_]+)/);
                if (rm && rm[0]) {
                    rs = rs.substring(1, rs.length - 1);
                    rs = rs.replace(/(@[a-zA-Z\d\_]+)/g, ($, $1) => {
                        if (syntax[$1.substring(1)] instanceof RegExp) {
                            var gs = syntax[$1.substring(1)].toString();
                            gs = gs.substring(1, gs.length - 1);
                            return `(${gs})`;
                        }
                        else
                            return $1;
                    });
                    return new RegExp(rs);
                }
            }
            else if (typeof r == 'string' && r.startsWith('@')) {
                if (typeof syntax[r.substring(1)] != 'undefined') {
                    return syntax[r.substring(1)];
                }
            }
            return r;
        }
        Lang.getLangSyntaxRegex = getLangSyntaxRegex;
        function convertLangSyntax(syntax) {
            for (var key in syntax) {
                if (syntax[key] instanceof RegExp)
                    syntax[key] = getLangSyntaxRegex(syntax, syntax[key]);
            }
            Object.keys(syntax).forEach(key => {
                if (Array.isArray(syntax[key])) {
                    syntax[key].forEach(z => {
                        if (Array.isArray(z.match)) {
                            for (var i = 0; i < z.match.length; i++) {
                                if (z.match[i])
                                    z.match[i] = getLangSyntaxRegex(syntax, z.match[i]);
                            }
                        }
                        else if (z.match)
                            z.match = getLangSyntaxRegex(syntax, z.match);
                    });
                }
            });
        }
        Lang.convertLangSyntax = convertLangSyntax;
    })(Lang = Ve.Lang || (Ve.Lang = {}));
})(Ve || (Ve = {}));
//# sourceMappingURL=rjs.js.map
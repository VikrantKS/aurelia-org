(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class $List extends Array {
        get isAbrupt() { return false; }
        get isList() { return true; }
        constructor(...items) {
            super(...items);
        }
        $copy() {
            return new $List(...this);
        }
        $contains(item) {
            return this.some(x => x.is(item));
        }
        GetValue(ctx) {
            return this;
        }
        enrichWith(ctx, node) {
            return this;
        }
        is(other) {
            return this === other;
        }
    }
    exports.$List = $List;
});
//# sourceMappingURL=list.js.map
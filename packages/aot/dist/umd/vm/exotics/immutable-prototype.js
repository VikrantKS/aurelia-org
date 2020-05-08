(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../types/object"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const object_1 = require("../types/object");
    // http://www.ecma-international.org/ecma-262/#sec-string-exotic-objects
    class $ImmutablePrototypeExoticObject extends object_1.$Object {
        constructor(realm, proto) {
            super(realm, 'ImmutablePrototypeExoticObject', proto, 1 /* normal */, realm['[[Intrinsics]]'].empty);
        }
        // http://www.ecma-international.org/ecma-262/#sec-immutable-prototype-exotic-objects-setprototypeof-v
        // 9.4.7.1 [[SetPrototypeOf]] ( V )
        '[[SetPrototypeOf]]'(ctx, V) {
            // 1. Return ? SetImmutablePrototype(O, V).
            // http://www.ecma-international.org/ecma-262/#sec-set-immutable-prototype
            // 9.4.7.2 SetImmutablePrototype ( O , V )
            // 1. Assert: Either Type(V) is Object or Type(V) is Null.
            // 2. Let current be ? O.[[GetPrototypeOf]]().
            const current = super['[[GetPrototypeOf]]'](ctx);
            if (current.isAbrupt) {
                return current;
            }
            // 3. If SameValue(V, current) is true, return true.
            if (V.is(current)) {
                return this.realm['[[Intrinsics]]'].true;
            }
            // 4. Return false.
            return this.realm['[[Intrinsics]]'].false;
        }
    }
    exports.$ImmutablePrototypeExoticObject = $ImmutablePrototypeExoticObject;
});
//# sourceMappingURL=immutable-prototype.js.map
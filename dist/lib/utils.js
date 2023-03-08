"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignPick = exports.pick = void 0;
function __assignType(fn, args) {
    fn.__type = args;
    return fn;
}
const __ΩPick = ['T', 'K', 'l+e#!e"!fRb!b"Pde""N#!'];
exports.pick = __assignType((object, keys) => {
    return Object.assign({}, ...keys.map(__assignType(key => {
        if (object && object.hasOwnProperty(key)) {
            return { [key]: object[key] };
        }
        return {};
    }, ['key', '', 'P"2!"/"'])));
}, ['object', 'keys', () => __ΩPick, '', 'P"2!"F2"""o##/$']);
exports.assignPick = __assignType((object, data, keys) => {
    Object.assign(object, (0, exports.pick)(data, keys));
}, ['object', 'data', 'keys', '', 'P"2!!2"!F2#$/$']);

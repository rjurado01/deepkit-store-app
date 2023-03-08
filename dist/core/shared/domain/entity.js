"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const class_validator_1 = require("class-validator");
const utils_1 = require("../../../lib/utils");
class Entity {
    assign(data) {
        Object.assign(this, (0, utils_1.pick)(data, this.properties()));
    }
    assignPick(data, keys) {
        Object.assign(this, (0, utils_1.pick)(data, keys));
    }
    constructor(data) {
        this.assign(data);
        (0, class_validator_1.validateSync)(self);
    }
}
exports.Entity = Entity;
Entity.__type = ['T', 'id', 'properties', 'data', 'assign', 'keys', 'assignPick', 'constructor', 'b!&3"P!F0#=P!2$$0%<P!2$!F2&"0\'<P!2$"0(5'];

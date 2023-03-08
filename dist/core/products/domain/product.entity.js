"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const __ΩPick = ['T', 'K', 'l+e#!e"!fRb!b"Pde""N#!'];
const __ΩExclude = ['T', 'U', 'l6!Re$!RPe#!e$"qk#%QRb!b"Pde"!p)'];
const __ΩOmit = ['T', 'K', () => __ΩPick, () => __ΩExclude, 'b!b"e!!e!!ge!"o$#o##'];
const class_validator_1 = require("class-validator");
const entity_1 = require("../../shared/domain/entity");
class Product extends entity_1.Entity {
    // METHODS
    properties() {
        return [
            'id',
            'name',
            'price',
            'description',
        ];
    }
    update(data) {
        this.assignPick(data, ['name', 'price', 'description']);
    }
}
Product.__type = [() => Product, () => entity_1.Entity, 'id', 'name', 'price', 'description', 'properties', () => __ΩOmit, "id", 'data', 'update', () => Product, 'PP7!7"&3#9&3$9\'3%9&3&89P!F0\'P!.)o(#2*"0+5P7,6"'];
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)()
], Product.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)()
], Product.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)()
], Product.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)()
], Product.prototype, "description", void 0);
exports.Product = Product;

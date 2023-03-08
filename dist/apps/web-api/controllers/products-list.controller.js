"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsListController = void 0;
/*@ts-ignore*/
const { __ΩHttpQueries } = require('@deepkit/http');
/*@ts-ignore*/
const { __ΩProductCriteria } = require('../../../core/products/domain/product.criteria');
const http_1 = require("@deepkit/http");
const list_products_service_1 = require("../../../core/products/app/list-products.service");
class ProductsListController {
    constructor(service) {
        this.service = service;
    }
    async run(query) {
        const result = await this.service.run(query);
        return result;
    }
}
ProductsListController.__type = [() => list_products_service_1.ListProductsService, 'service', 'constructor', () => __ΩHttpQueries, () => __ΩProductCriteria, 'query', 'run', 'PP7!2";"0#Pn%o$"2&"0\'5'];
__decorate([
    http_1.http.GET('/products')
], ProductsListController.prototype, "run", null);
exports.ProductsListController = ProductsListController;

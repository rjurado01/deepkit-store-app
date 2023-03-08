"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProductsService = void 0;
/*@ts-ignore*/
const { __ΩProductRepository } = require("../domain/product.repository");
/*@ts-ignore*/
const { __ΩProductCriteria } = require("../domain/product.criteria");
class ListProductsService {
    constructor(repository) {
        this.repository = repository;
    }
    async run(query) {
        const data = await this.repository.findAll(query);
        const count = await this.repository.count(query);
        return { data, meta: { totalElements: count } };
    }
}
exports.ListProductsService = ListProductsService;
ListProductsService.__type = [() => __ΩProductRepository, 'repository', 'constructor', () => __ΩProductCriteria, 'query', 'run', 'Pn!2";9"0#Pn$2%"0&5'];

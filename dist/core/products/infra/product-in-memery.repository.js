"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInMemeoryRepository = void 0;
/*@ts-ignore*/
const { __ΩProductCriteria } = require("../domain/product.criteria");
function __assignType(fn, args) {
    fn.__type = args;
    return fn;
}
const product_entity_1 = require("../domain/product.entity");
class ProductInMemeoryRepository {
    findAll(query) {
        let result = this.products;
        if (query?.filter) {
            result = result.filter(__assignType(item => {
                const id = !query.filter?.id || item.id === query.filter.id;
                const search = !query.filter?.search || item.name === query.filter.search;
                return id && search;
            }, ['item', '', 'P"2!"/"']));
        }
        return Promise.resolve(this.products);
    }
    count(_query) {
        return Promise.resolve(this.products.length);
    }
    async create(product) {
        this.products.push(product);
    }
    async clear() {
        this.products = [];
    }
}
exports.ProductInMemeoryRepository = ProductInMemeoryRepository;
ProductInMemeoryRepository.__type = [() => product_entity_1.Product, 'products', () => __ΩProductCriteria, 'query', () => product_entity_1.Product, 'findAll', () => __ΩProductCriteria, '_query', 'count', () => product_entity_1.Product, 'product', 'create', 'clear', 'P7!F3";PPn#-J2$8P7%F`0&PPn\'-J2(8\'`0)PP7*2+$`0,P"0-5'];

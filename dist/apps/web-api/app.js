"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ts-ignore*/
const { __ΩProductRepository } = require('../../core/products/domain/product.repository');
function __assignType(fn, args) {
    fn.__type = args;
    return fn;
}
const app_1 = require("@deepkit/app");
const framework_1 = require("@deepkit/framework");
const injector_1 = require("@deepkit/injector");
const logger_1 = require("@deepkit/logger");
const list_products_service_1 = require("../../core/products/app/list-products.service");
const product_in_memery_repository_1 = require("../../core/products/infra/product-in-memery.repository");
const config_1 = require("./config");
const products_list_controller_1 = require("./controllers/products-list.controller");
const x = new app_1.App({
    config: config_1.AppConfig,
    controllers: [
        products_list_controller_1.ProductsListController,
    ],
    providers: [
        list_products_service_1.ListProductsService,
        (injector_1.provide.Ω = [[() => __ΩProductRepository, 'n!']], (0, injector_1.provide)(product_in_memery_repository_1.ProductInMemeoryRepository)),
    ],
    imports: [new framework_1.FrameworkModule({ debug: true })]
})
    .loadConfigFromEnv({ envFilePath: ['production.env', '.env'] })
    .setup(__assignType((module, config) => {
    if (config.environment === 'production') {
        //enable logging JSON messages instead of formatted strings
        (module.setupGlobalProvider.Ω = [[() => logger_1.Logger, 'P7!']], module.setupGlobalProvider()).setTransport([new logger_1.JSONTransport]);
        //disable debugging
        module.getImportedModuleByClass(framework_1.FrameworkModule).configure({ debug: false });
    }
}, ['module', () => config_1.AppConfig, 'config', '', 'P"2!P7"2#"/$']))
    .run();

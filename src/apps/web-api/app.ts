import {App} from '@deepkit/app';
import {FrameworkModule} from '@deepkit/framework';
import {provide} from '@deepkit/injector';
import {JSONTransport, Logger} from '@deepkit/logger';

import {ListProductsService} from '../../core/products/app/list-products.service';
import {ProductRepository} from '../../core/products/domain/product.repository';
import {ProductInMemeoryRepository} from '../../core/products/infra/product-in-memery.repository';

import {AppConfig} from './config';
import {ListProductsController} from './controllers/products-list.controller';

new App({
  config: AppConfig,
  controllers: [
    ListProductsController,
  ],
  providers: [
    ListProductsService,

    provide<ProductRepository>(ProductInMemeoryRepository),
  ],
  imports: [new FrameworkModule({ debug: true })]
})
.loadConfigFromEnv({ envFilePath: ['production.env', '.env'] })
.setup((module, config: AppConfig) => {
  if (config.environment === 'production') {
    //enable logging JSON messages instead of formatted strings
    module.setupGlobalProvider<Logger>().setTransport([new JSONTransport]);

    //disable debugging
    module.getImportedModuleByClass(FrameworkModule).configure({debug: false});
  }
})
.run();

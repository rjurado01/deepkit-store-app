* Instala las dependencias con: `yarn install`
* Ejecuta el servidor con: `SKIP_AUTH=true node apps/web-api/app.js`

> Quitar la variable de entorno SKIP_AUTH cuando se llege al punto de Auth del tutorial

### Recursos

Session:

* Crear sesión: `POST /sessions`

Categorias de Productos:

* Listado de categorias: `GET /product-categories`

Productos:

* Crear sesión: `POST /sessions`
* Obtener estadísticas: `GET /stats`
* Listado de productos: `GET /products`
* Crear un producto: `POST /products`
* Editar un producto: `PUT /products/:id`
* Eliminar un producto: `DELETE /products/:id`

### Estructura criteria

```
{
  filter: {search: 'string', priceLT: 200},
  page: {size: 1, number:1},
  order: {field: value, dir: 'desc' | 'asc'}
}
```

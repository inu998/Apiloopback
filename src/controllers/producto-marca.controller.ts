import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Producto,
  Marca,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoMarcaController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/marcas', {
    responses: {
      '200': {
        description: 'Array of Producto has many Marca',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Marca)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Marca>,
  ): Promise<Marca[]> {
    return this.productoRepository.Producto_Marcas(id).find(filter);
  }

  @post('/productos/{id}/marcas', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Marca)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.idproducto,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marca, {
            title: 'NewMarcaInProducto',
            exclude: ['idmarca'],
            optional: ['idproducto']
          }),
        },
      },
    }) marca: Omit<Marca, 'idmarca'>,
  ): Promise<Marca> {
    return this.productoRepository.Producto_Marcas(id).create(marca);
  }

  @patch('/productos/{id}/marcas', {
    responses: {
      '200': {
        description: 'Producto.Marca PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marca, {partial: true}),
        },
      },
    })
    marca: Partial<Marca>,
    @param.query.object('where', getWhereSchemaFor(Marca)) where?: Where<Marca>,
  ): Promise<Count> {
    return this.productoRepository.Producto_Marcas(id).patch(marca, where);
  }

  @del('/productos/{id}/marcas', {
    responses: {
      '200': {
        description: 'Producto.Marca DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Marca)) where?: Where<Marca>,
  ): Promise<Count> {
    return this.productoRepository.Producto_Marcas(id).delete(where);
  }
}

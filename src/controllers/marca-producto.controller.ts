import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Marca,
  Producto,
} from '../models';
import {MarcaRepository} from '../repositories';

export class MarcaProductoController {
  constructor(
    @repository(MarcaRepository)
    public marcaRepository: MarcaRepository,
  ) { }

  @get('/marcas/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to Marca',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.string('id') id: typeof Marca.prototype.idmarca,
  ): Promise<Producto> {
    return this.marcaRepository.MarcaProducto(id);
  }
}

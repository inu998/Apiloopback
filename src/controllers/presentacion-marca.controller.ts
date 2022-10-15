import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Presentacion,
  Marca,
} from '../models';
import {PresentacionRepository} from '../repositories';

export class PresentacionMarcaController {
  constructor(
    @repository(PresentacionRepository)
    public presentacionRepository: PresentacionRepository,
  ) { }

  @get('/presentacions/{id}/marca', {
    responses: {
      '200': {
        description: 'Marca belonging to Presentacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Marca)},
          },
        },
      },
    },
  })
  async getMarca(
    @param.path.string('id') id: typeof Presentacion.prototype.idpresentacion,
  ): Promise<Marca> {
    return this.presentacionRepository.PresentacionMarca(id);
  }
}

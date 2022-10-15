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
  Marca,
  Presentacion,
} from '../models';
import {MarcaRepository} from '../repositories';

export class MarcaPresentacionController {
  constructor(
    @repository(MarcaRepository) protected marcaRepository: MarcaRepository,
  ) { }

  @get('/marcas/{id}/presentacions', {
    responses: {
      '200': {
        description: 'Array of Marca has many Presentacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Presentacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Presentacion>,
  ): Promise<Presentacion[]> {
    return this.marcaRepository.MarcaPresentacion(id).find(filter);
  }

  @post('/marcas/{id}/presentacions', {
    responses: {
      '200': {
        description: 'Marca model instance',
        content: {'application/json': {schema: getModelSchemaRef(Presentacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Marca.prototype.idmarca,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Presentacion, {
            title: 'NewPresentacionInMarca',
            exclude: ['idpresentacion'],
            optional: ['idmarca']
          }),
        },
      },
    }) presentacion: Omit<Presentacion, 'idpresentacion'>,
  ): Promise<Presentacion> {
    return this.marcaRepository.MarcaPresentacion(id).create(presentacion);
  }

  @patch('/marcas/{id}/presentacions', {
    responses: {
      '200': {
        description: 'Marca.Presentacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Presentacion, {partial: true}),
        },
      },
    })
    presentacion: Partial<Presentacion>,
    @param.query.object('where', getWhereSchemaFor(Presentacion)) where?: Where<Presentacion>,
  ): Promise<Count> {
    return this.marcaRepository.MarcaPresentacion(id).patch(presentacion, where);
  }

  @del('/marcas/{id}/presentacions', {
    responses: {
      '200': {
        description: 'Marca.Presentacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Presentacion)) where?: Where<Presentacion>,
  ): Promise<Count> {
    return this.marcaRepository.MarcaPresentacion(id).delete(where);
  }
}

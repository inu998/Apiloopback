import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Presentacion} from '../models';
import {PresentacionRepository} from '../repositories';

export class PresentacionController {
  constructor(
    @repository(PresentacionRepository)
    public presentacionRepository : PresentacionRepository,
  ) {}

  @post('/presentaciones')
  @response(200, {
    description: 'Presentacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Presentacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Presentacion, {
            title: 'NewPresentacion',
            exclude: ['idpresentacion'],
          }),
        },
      },
    })
    presentacion: Omit<Presentacion, 'idpresentacion'>,
  ): Promise<Presentacion> {
    return this.presentacionRepository.create(presentacion);
  }

  @get('/presentaciones/count')
  @response(200, {
    description: 'Presentacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Presentacion) where?: Where<Presentacion>,
  ): Promise<Count> {
    return this.presentacionRepository.count(where);
  }

  @get('/presentaciones')
  @response(200, {
    description: 'Array of Presentacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Presentacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Presentacion) filter?: Filter<Presentacion>,
  ): Promise<Presentacion[]> {
    return this.presentacionRepository.find(filter);
  }

  @patch('/presentaciones')
  @response(200, {
    description: 'Presentacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Presentacion, {partial: true}),
        },
      },
    })
    presentacion: Presentacion,
    @param.where(Presentacion) where?: Where<Presentacion>,
  ): Promise<Count> {
    return this.presentacionRepository.updateAll(presentacion, where);
  }

  @get('/presentaciones/{id}')
  @response(200, {
    description: 'Presentacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Presentacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Presentacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Presentacion>
  ): Promise<Presentacion> {
    return this.presentacionRepository.findById(id, filter);
  }

  @patch('/presentaciones/{id}')
  @response(204, {
    description: 'Presentacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Presentacion, {partial: true}),
        },
      },
    })
    presentacion: Presentacion,
  ): Promise<void> {
    await this.presentacionRepository.updateById(id, presentacion);
  }

  @put('/presentaciones/{id}')
  @response(204, {
    description: 'Presentacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() presentacion: Presentacion,
  ): Promise<void> {
    await this.presentacionRepository.replaceById(id, presentacion);
  }

  @del('/presentaciones/{id}')
  @response(204, {
    description: 'Presentacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.presentacionRepository.deleteById(id);
  }
}

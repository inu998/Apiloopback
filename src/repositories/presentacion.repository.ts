import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Presentacion, PresentacionRelations, Marca} from '../models';
import {MarcaRepository} from './marca.repository';

export class PresentacionRepository extends DefaultCrudRepository<
  Presentacion,
  typeof Presentacion.prototype.idpresentacion,
  PresentacionRelations
> {

  public readonly PresentacionMarca: BelongsToAccessor<Marca, typeof Presentacion.prototype.idpresentacion>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('MarcaRepository') protected marcaRepositoryGetter: Getter<MarcaRepository>,
  ) {
    super(Presentacion, dataSource);
    this.PresentacionMarca = this.createBelongsToAccessorFor('PresentacionMarca', marcaRepositoryGetter,);
    this.registerInclusionResolver('PresentacionMarca', this.PresentacionMarca.inclusionResolver);
  }
}

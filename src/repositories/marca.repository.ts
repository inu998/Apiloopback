import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Marca, MarcaRelations, Producto, Presentacion} from '../models';
import {ProductoRepository} from './producto.repository';
import {PresentacionRepository} from './presentacion.repository';

export class MarcaRepository extends DefaultCrudRepository<
  Marca,
  typeof Marca.prototype.idmarca,
  MarcaRelations
> {

  public readonly MarcaProducto: BelongsToAccessor<Producto, typeof Marca.prototype.idmarca>;

  public readonly MarcaPresentacion: HasManyRepositoryFactory<Presentacion, typeof Marca.prototype.idmarca>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('PresentacionRepository') protected presentacionRepositoryGetter: Getter<PresentacionRepository>,
  ) {
    super(Marca, dataSource);
    this.MarcaPresentacion = this.createHasManyRepositoryFactoryFor('MarcaPresentacion', presentacionRepositoryGetter,);
    this.registerInclusionResolver('MarcaPresentacion', this.MarcaPresentacion.inclusionResolver);
    this.MarcaProducto = this.createBelongsToAccessorFor('MarcaProducto', productoRepositoryGetter,);
    this.registerInclusionResolver('MarcaProducto', this.MarcaProducto.inclusionResolver);
  }
}

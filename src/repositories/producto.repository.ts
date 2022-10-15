import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Producto, ProductoRelations, Marca} from '../models';
import {MarcaRepository} from './marca.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.idproducto,
  ProductoRelations
> {

  public readonly Producto_Marcas: HasManyRepositoryFactory<Marca, typeof Producto.prototype.idproducto>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('MarcaRepository') protected marcaRepositoryGetter: Getter<MarcaRepository>,
  ) {
    super(Producto, dataSource);
    this.Producto_Marcas = this.createHasManyRepositoryFactoryFor('Producto_Marcas', marcaRepositoryGetter,);
    this.registerInclusionResolver('Producto_Marcas', this.Producto_Marcas.inclusionResolver);
  }
}

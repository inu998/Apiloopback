import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Producto} from './producto.model';
import {Presentacion} from './presentacion.model';

@model()
export class Marca extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idmarca?: string;

  @property({
    type: 'string',
    required: true,
  })
  Logotipo: string;

  @property({
    type: 'string',
    required: true,
  })
  Color: string;

  @belongsTo(() => Producto, {name: 'MarcaProducto'})
  idproducto: string;

  @hasMany(() => Presentacion, {keyTo: 'idmarca'})
  MarcaPresentacion: Presentacion[];

  constructor(data?: Partial<Marca>) {
    super(data);
  }
}

export interface MarcaRelations {
  // describe navigational properties here
}

export type MarcaWithRelations = Marca & MarcaRelations;

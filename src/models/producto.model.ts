import {Entity, model, property, hasMany} from '@loopback/repository';
import {Marca} from './marca.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idproducto?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Peso: string;

  @property({
    type: 'number',
    required: true,
  })
  Valor: number;

  @hasMany(() => Marca, {keyTo: 'idproducto'})
  Producto_Marcas: Marca[];

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;

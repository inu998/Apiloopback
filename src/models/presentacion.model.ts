import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Marca} from './marca.model';

@model()
export class Presentacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idpresentacion?: string;

  @property({
    type: 'string',
    required: true,
  })
  Empaque: string;

  @property({
    type: 'string',
    required: true,
  })
  Botella: string;

  @belongsTo(() => Marca, {name: 'PresentacionMarca'})
  idmarca: string;

  constructor(data?: Partial<Presentacion>) {
    super(data);
  }
}

export interface PresentacionRelations {
  // describe navigational properties here
}

export type PresentacionWithRelations = Presentacion & PresentacionRelations;

import {Entity, model, property, hasMany} from '@loopback/repository';
import {ServicioVenta} from './servicio-venta.model';

@model()
export class Carro extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  placa: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  year: string;

  @hasMany(() => ServicioVenta)
  servicioVentas: ServicioVenta[];

  constructor(data?: Partial<Carro>) {
    super(data);
  }
}

export interface CarroRelations {
  // describe navigational properties here
}

export type CarroWithRelations = Carro & CarroRelations;

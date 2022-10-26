import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Servicio} from './servicio.model';
import {Carro} from './carro.model';
import {Administrador} from './administrador.model';

@model()
export class ServicioVenta extends Entity {
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
  codigoServicio: string;

  @property({
    type: 'string',
    required: true,
  })
  identificacionCliente: string;

  @property({
    type: 'string',
    required: true,
  })
  placaCarro: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaServicio: string;

  @property({
    type: 'number',
    required: true,
  })
  precioServicio: number;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Servicio)
  servicioId: string;

  @belongsTo(() => Carro)
  carroId: string;

  @hasMany(() => Administrador)
  administradors: Administrador[];

  constructor(data?: Partial<ServicioVenta>) {
    super(data);
  }
}

export interface ServicioVentaRelations {
  // describe navigational properties here
}

export type ServicioVentaWithRelations = ServicioVenta & ServicioVentaRelations;

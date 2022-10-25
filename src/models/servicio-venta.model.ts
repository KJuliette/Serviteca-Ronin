import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<ServicioVenta>) {
    super(data);
  }
}

export interface ServicioVentaRelations {
  // describe navigational properties here
}

export type ServicioVentaWithRelations = ServicioVenta & ServicioVentaRelations;

import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cliente,
  ServicioVenta,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteServicioVentaController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/servicio-ventas', {
    responses: {
      '200': {
        description: 'Array of Cliente has many ServicioVenta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ServicioVenta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ServicioVenta>,
  ): Promise<ServicioVenta[]> {
    return this.clienteRepository.servicioVentas(id).find(filter);
  }

  @post('/clientes/{id}/servicio-ventas', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(ServicioVenta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioVenta, {
            title: 'NewServicioVentaInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) servicioVenta: Omit<ServicioVenta, 'id'>,
  ): Promise<ServicioVenta> {
    return this.clienteRepository.servicioVentas(id).create(servicioVenta);
  }

  @patch('/clientes/{id}/servicio-ventas', {
    responses: {
      '200': {
        description: 'Cliente.ServicioVenta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioVenta, {partial: true}),
        },
      },
    })
    servicioVenta: Partial<ServicioVenta>,
    @param.query.object('where', getWhereSchemaFor(ServicioVenta)) where?: Where<ServicioVenta>,
  ): Promise<Count> {
    return this.clienteRepository.servicioVentas(id).patch(servicioVenta, where);
  }

  @del('/clientes/{id}/servicio-ventas', {
    responses: {
      '200': {
        description: 'Cliente.ServicioVenta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ServicioVenta)) where?: Where<ServicioVenta>,
  ): Promise<Count> {
    return this.clienteRepository.servicioVentas(id).delete(where);
  }
}

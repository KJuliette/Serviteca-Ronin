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
  Servicio,
  ServicioVenta,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioServicioVentaController {
  constructor(
    @repository(ServicioRepository) protected servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/servicio-ventas', {
    responses: {
      '200': {
        description: 'Array of Servicio has many ServicioVenta',
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
    return this.servicioRepository.servicioVentas(id).find(filter);
  }

  @post('/servicios/{id}/servicio-ventas', {
    responses: {
      '200': {
        description: 'Servicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(ServicioVenta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Servicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioVenta, {
            title: 'NewServicioVentaInServicio',
            exclude: ['id'],
            optional: ['servicioId']
          }),
        },
      },
    }) servicioVenta: Omit<ServicioVenta, 'id'>,
  ): Promise<ServicioVenta> {
    return this.servicioRepository.servicioVentas(id).create(servicioVenta);
  }

  @patch('/servicios/{id}/servicio-ventas', {
    responses: {
      '200': {
        description: 'Servicio.ServicioVenta PATCH success count',
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
    return this.servicioRepository.servicioVentas(id).patch(servicioVenta, where);
  }

  @del('/servicios/{id}/servicio-ventas', {
    responses: {
      '200': {
        description: 'Servicio.ServicioVenta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ServicioVenta)) where?: Where<ServicioVenta>,
  ): Promise<Count> {
    return this.servicioRepository.servicioVentas(id).delete(where);
  }
}

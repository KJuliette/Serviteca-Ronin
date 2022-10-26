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
  Carro,
  ServicioVenta,
} from '../models';
import {CarroRepository} from '../repositories';

export class CarroServicioVentaController {
  constructor(
    @repository(CarroRepository) protected carroRepository: CarroRepository,
  ) { }

  @get('/carros/{id}/servicio-ventas', {
    responses: {
      '200': {
        description: 'Array of Carro has many ServicioVenta',
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
    return this.carroRepository.servicioVentas(id).find(filter);
  }

  @post('/carros/{id}/servicio-ventas', {
    responses: {
      '200': {
        description: 'Carro model instance',
        content: {'application/json': {schema: getModelSchemaRef(ServicioVenta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Carro.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioVenta, {
            title: 'NewServicioVentaInCarro',
            exclude: ['id'],
            optional: ['carroId']
          }),
        },
      },
    }) servicioVenta: Omit<ServicioVenta, 'id'>,
  ): Promise<ServicioVenta> {
    return this.carroRepository.servicioVentas(id).create(servicioVenta);
  }

  @patch('/carros/{id}/servicio-ventas', {
    responses: {
      '200': {
        description: 'Carro.ServicioVenta PATCH success count',
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
    return this.carroRepository.servicioVentas(id).patch(servicioVenta, where);
  }

  @del('/carros/{id}/servicio-ventas', {
    responses: {
      '200': {
        description: 'Carro.ServicioVenta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ServicioVenta)) where?: Where<ServicioVenta>,
  ): Promise<Count> {
    return this.carroRepository.servicioVentas(id).delete(where);
  }
}

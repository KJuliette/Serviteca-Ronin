import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ServicioVenta} from '../models';
import {ServicioVentaRepository} from '../repositories';

export class ServicioVentaController {
  constructor(
    @repository(ServicioVentaRepository)
    public servicioVentaRepository : ServicioVentaRepository,
  ) {}

  @post('/servicio-ventas')
  @response(200, {
    description: 'ServicioVenta model instance',
    content: {'application/json': {schema: getModelSchemaRef(ServicioVenta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioVenta, {
            title: 'NewServicioVenta',
            exclude: ['id'],
          }),
        },
      },
    })
    servicioVenta: Omit<ServicioVenta, 'id'>,
  ): Promise<ServicioVenta> {
    return this.servicioVentaRepository.create(servicioVenta);
  }

  @get('/servicio-ventas/count')
  @response(200, {
    description: 'ServicioVenta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ServicioVenta) where?: Where<ServicioVenta>,
  ): Promise<Count> {
    return this.servicioVentaRepository.count(where);
  }

  @get('/servicio-ventas')
  @response(200, {
    description: 'Array of ServicioVenta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ServicioVenta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ServicioVenta) filter?: Filter<ServicioVenta>,
  ): Promise<ServicioVenta[]> {
    return this.servicioVentaRepository.find(filter);
  }

  @patch('/servicio-ventas')
  @response(200, {
    description: 'ServicioVenta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioVenta, {partial: true}),
        },
      },
    })
    servicioVenta: ServicioVenta,
    @param.where(ServicioVenta) where?: Where<ServicioVenta>,
  ): Promise<Count> {
    return this.servicioVentaRepository.updateAll(servicioVenta, where);
  }

  @get('/servicio-ventas/{id}')
  @response(200, {
    description: 'ServicioVenta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ServicioVenta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ServicioVenta, {exclude: 'where'}) filter?: FilterExcludingWhere<ServicioVenta>
  ): Promise<ServicioVenta> {
    return this.servicioVentaRepository.findById(id, filter);
  }

  @patch('/servicio-ventas/{id}')
  @response(204, {
    description: 'ServicioVenta PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioVenta, {partial: true}),
        },
      },
    })
    servicioVenta: ServicioVenta,
  ): Promise<void> {
    await this.servicioVentaRepository.updateById(id, servicioVenta);
  }

  @put('/servicio-ventas/{id}')
  @response(204, {
    description: 'ServicioVenta PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() servicioVenta: ServicioVenta,
  ): Promise<void> {
    await this.servicioVentaRepository.replaceById(id, servicioVenta);
  }

  @del('/servicio-ventas/{id}')
  @response(204, {
    description: 'ServicioVenta DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.servicioVentaRepository.deleteById(id);
  }
}

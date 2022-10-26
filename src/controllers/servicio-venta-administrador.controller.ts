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
  ServicioVenta,
  Administrador,
} from '../models';
import {ServicioVentaRepository} from '../repositories';

export class ServicioVentaAdministradorController {
  constructor(
    @repository(ServicioVentaRepository) protected servicioVentaRepository: ServicioVentaRepository,
  ) { }

  @get('/servicio-ventas/{id}/administradors', {
    responses: {
      '200': {
        description: 'Array of ServicioVenta has many Administrador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Administrador>,
  ): Promise<Administrador[]> {
    return this.servicioVentaRepository.administradors(id).find(filter);
  }

  @post('/servicio-ventas/{id}/administradors', {
    responses: {
      '200': {
        description: 'ServicioVenta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Administrador)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ServicioVenta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {
            title: 'NewAdministradorInServicioVenta',
            exclude: ['id'],
            optional: ['servicioVentaId']
          }),
        },
      },
    }) administrador: Omit<Administrador, 'id'>,
  ): Promise<Administrador> {
    return this.servicioVentaRepository.administradors(id).create(administrador);
  }

  @patch('/servicio-ventas/{id}/administradors', {
    responses: {
      '200': {
        description: 'ServicioVenta.Administrador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {partial: true}),
        },
      },
    })
    administrador: Partial<Administrador>,
    @param.query.object('where', getWhereSchemaFor(Administrador)) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.servicioVentaRepository.administradors(id).patch(administrador, where);
  }

  @del('/servicio-ventas/{id}/administradors', {
    responses: {
      '200': {
        description: 'ServicioVenta.Administrador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Administrador)) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.servicioVentaRepository.administradors(id).delete(where);
  }
}

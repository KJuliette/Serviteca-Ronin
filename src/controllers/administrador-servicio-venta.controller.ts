import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Administrador,
  ServicioVenta,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorServicioVentaController {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/servicio-venta', {
    responses: {
      '200': {
        description: 'ServicioVenta belonging to Administrador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ServicioVenta)},
          },
        },
      },
    },
  })
  async getServicioVenta(
    @param.path.string('id') id: typeof Administrador.prototype.id,
  ): Promise<ServicioVenta> {
    return this.administradorRepository.servicioVenta(id);
  }
}

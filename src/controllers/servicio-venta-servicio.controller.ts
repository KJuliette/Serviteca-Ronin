import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ServicioVenta,
  Servicio,
} from '../models';
import {ServicioVentaRepository} from '../repositories';

export class ServicioVentaServicioController {
  constructor(
    @repository(ServicioVentaRepository)
    public servicioVentaRepository: ServicioVentaRepository,
  ) { }

  @get('/servicio-ventas/{id}/servicio', {
    responses: {
      '200': {
        description: 'Servicio belonging to ServicioVenta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicio)},
          },
        },
      },
    },
  })
  async getServicio(
    @param.path.string('id') id: typeof ServicioVenta.prototype.id,
  ): Promise<Servicio> {
    return this.servicioVentaRepository.servicio(id);
  }
}

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
  Cliente,
} from '../models';
import {ServicioVentaRepository} from '../repositories';

export class ServicioVentaClienteController {
  constructor(
    @repository(ServicioVentaRepository)
    public servicioVentaRepository: ServicioVentaRepository,
  ) { }

  @get('/servicio-ventas/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to ServicioVenta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof ServicioVenta.prototype.id,
  ): Promise<Cliente> {
    return this.servicioVentaRepository.cliente(id);
  }
}

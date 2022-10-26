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
  Carro,
} from '../models';
import {ServicioVentaRepository} from '../repositories';

export class ServicioVentaCarroController {
  constructor(
    @repository(ServicioVentaRepository)
    public servicioVentaRepository: ServicioVentaRepository,
  ) { }

  @get('/servicio-ventas/{id}/carro', {
    responses: {
      '200': {
        description: 'Carro belonging to ServicioVenta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Carro)},
          },
        },
      },
    },
  })
  async getCarro(
    @param.path.string('id') id: typeof ServicioVenta.prototype.id,
  ): Promise<Carro> {
    return this.servicioVentaRepository.carro(id);
  }
}

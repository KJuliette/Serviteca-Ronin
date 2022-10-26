import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, ServicioVenta} from '../models';
import {ServicioVentaRepository} from './servicio-venta.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly servicioVentas: HasManyRepositoryFactory<ServicioVenta, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ServicioVentaRepository') protected servicioVentaRepositoryGetter: Getter<ServicioVentaRepository>,
  ) {
    super(Cliente, dataSource);
    this.servicioVentas = this.createHasManyRepositoryFactoryFor('servicioVentas', servicioVentaRepositoryGetter,);
    this.registerInclusionResolver('servicioVentas', this.servicioVentas.inclusionResolver);
  }
}

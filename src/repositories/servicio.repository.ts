import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Servicio, ServicioRelations, ServicioVenta} from '../models';
import {ServicioVentaRepository} from './servicio-venta.repository';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.id,
  ServicioRelations
> {

  public readonly servicioVentas: HasManyRepositoryFactory<ServicioVenta, typeof Servicio.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ServicioVentaRepository') protected servicioVentaRepositoryGetter: Getter<ServicioVentaRepository>,
  ) {
    super(Servicio, dataSource);
    this.servicioVentas = this.createHasManyRepositoryFactoryFor('servicioVentas', servicioVentaRepositoryGetter,);
    this.registerInclusionResolver('servicioVentas', this.servicioVentas.inclusionResolver);
  }
}

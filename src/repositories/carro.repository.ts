import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Carro, CarroRelations, ServicioVenta} from '../models';
import {ServicioVentaRepository} from './servicio-venta.repository';

export class CarroRepository extends DefaultCrudRepository<
  Carro,
  typeof Carro.prototype.id,
  CarroRelations
> {

  public readonly servicioVentas: HasManyRepositoryFactory<ServicioVenta, typeof Carro.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ServicioVentaRepository') protected servicioVentaRepositoryGetter: Getter<ServicioVentaRepository>,
  ) {
    super(Carro, dataSource);
    this.servicioVentas = this.createHasManyRepositoryFactoryFor('servicioVentas', servicioVentaRepositoryGetter,);
    this.registerInclusionResolver('servicioVentas', this.servicioVentas.inclusionResolver);
  }
}

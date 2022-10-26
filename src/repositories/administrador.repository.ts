import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Administrador, AdministradorRelations, ServicioVenta} from '../models';
import {ServicioVentaRepository} from './servicio-venta.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly servicioVenta: BelongsToAccessor<ServicioVenta, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ServicioVentaRepository') protected servicioVentaRepositoryGetter: Getter<ServicioVentaRepository>,
  ) {
    super(Administrador, dataSource);
    this.servicioVenta = this.createBelongsToAccessorFor('servicioVenta', servicioVentaRepositoryGetter,);
    this.registerInclusionResolver('servicioVenta', this.servicioVenta.inclusionResolver);
  }
}

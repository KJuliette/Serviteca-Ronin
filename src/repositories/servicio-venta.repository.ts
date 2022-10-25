import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ServicioVenta, ServicioVentaRelations} from '../models';

export class ServicioVentaRepository extends DefaultCrudRepository<
  ServicioVenta,
  typeof ServicioVenta.prototype.id,
  ServicioVentaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ServicioVenta, dataSource);
  }
}

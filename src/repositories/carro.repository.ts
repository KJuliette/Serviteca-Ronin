import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Carro, CarroRelations} from '../models';

export class CarroRepository extends DefaultCrudRepository<
  Carro,
  typeof Carro.prototype.id,
  CarroRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Carro, dataSource);
  }
}

import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ServicioVenta, ServicioVentaRelations, Cliente, Servicio, Carro, Administrador} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ServicioRepository} from './servicio.repository';
import {CarroRepository} from './carro.repository';
import {AdministradorRepository} from './administrador.repository';

export class ServicioVentaRepository extends DefaultCrudRepository<
  ServicioVenta,
  typeof ServicioVenta.prototype.id,
  ServicioVentaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof ServicioVenta.prototype.id>;

  public readonly servicio: BelongsToAccessor<Servicio, typeof ServicioVenta.prototype.id>;

  public readonly carro: BelongsToAccessor<Carro, typeof ServicioVenta.prototype.id>;

  public readonly administradors: HasManyRepositoryFactory<Administrador, typeof ServicioVenta.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>, @repository.getter('CarroRepository') protected carroRepositoryGetter: Getter<CarroRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(ServicioVenta, dataSource);
    this.administradors = this.createHasManyRepositoryFactoryFor('administradors', administradorRepositoryGetter,);
    this.registerInclusionResolver('administradors', this.administradors.inclusionResolver);
    this.carro = this.createBelongsToAccessorFor('carro', carroRepositoryGetter,);
    this.registerInclusionResolver('carro', this.carro.inclusionResolver);
    this.servicio = this.createBelongsToAccessorFor('servicio', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicio', this.servicio.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}

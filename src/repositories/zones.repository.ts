import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbmongoDataSource} from '../datasources';
import {Zones, ZonesRelations} from '../models';

export class ZonesRepository extends DefaultCrudRepository<
  Zones,
  typeof Zones.prototype.id,
  ZonesRelations
> {
  constructor(
    @inject('datasources.dbmongo') dataSource: DbmongoDataSource,
  ) {
    super(Zones, dataSource);
  }
}

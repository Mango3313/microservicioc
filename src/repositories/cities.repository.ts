import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbmongoDataSource} from '../datasources';
import {Cities, CitiesRelations} from '../models';

export class CitiesRepository extends DefaultCrudRepository<
  Cities,
  typeof Cities.prototype.town,
  CitiesRelations
> {
  constructor(
    @inject('datasources.dbmongo') dataSource: DbmongoDataSource,
  ) {
    super(Cities, dataSource);
  }
}

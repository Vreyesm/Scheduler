import {DefaultCrudRepository} from '@loopback/repository';
import {Building} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BuildingRepository extends DefaultCrudRepository<
  Building,
  typeof Building.prototype.ID
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(Building, dataSource);
  }
}

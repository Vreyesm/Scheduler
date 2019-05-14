import {DefaultCrudRepository} from '@loopback/repository';
import {Career} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CareerRepository extends DefaultCrudRepository<
  Career,
  typeof Career.prototype.ID
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(Career, dataSource);
  }
}

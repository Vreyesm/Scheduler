import {DefaultCrudRepository} from '@loopback/repository';
import {Assignation} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AssignationRepository extends DefaultCrudRepository<
  Assignation,
  typeof Assignation.prototype.ID
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(Assignation, dataSource);
  }
}

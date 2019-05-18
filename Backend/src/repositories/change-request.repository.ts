import {DefaultCrudRepository} from '@loopback/repository';
import {ChangeRequest} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ChangeRequestRepository extends DefaultCrudRepository<
  ChangeRequest,
  typeof ChangeRequest.prototype.ID
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(ChangeRequest, dataSource);
  }
}

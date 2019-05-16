import {DefaultCrudRepository} from '@loopback/repository';
import {AssignationRequest} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AssignationRequestRepository extends DefaultCrudRepository<
  AssignationRequest,
  typeof AssignationRequest.prototype.ID
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(AssignationRequest, dataSource);
  }
}

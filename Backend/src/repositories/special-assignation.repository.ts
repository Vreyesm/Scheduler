import {DefaultCrudRepository} from '@loopback/repository';
import {SpecialAssignation} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SpecialAssignationRepository extends DefaultCrudRepository<
  SpecialAssignation,
  typeof SpecialAssignation.prototype.ID
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(SpecialAssignation, dataSource);
  }
}

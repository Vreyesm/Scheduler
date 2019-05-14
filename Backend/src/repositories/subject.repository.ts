import {DefaultCrudRepository} from '@loopback/repository';
import {Subject} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SubjectRepository extends DefaultCrudRepository<
  Subject,
  typeof Subject.prototype.ID
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(Subject, dataSource);
  }
}

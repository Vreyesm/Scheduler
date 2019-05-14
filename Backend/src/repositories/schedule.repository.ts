import {DefaultCrudRepository} from '@loopback/repository';
import {Schedule} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ScheduleRepository extends DefaultCrudRepository<
  Schedule,
  typeof Schedule.prototype.ID
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(Schedule, dataSource);
  }
}

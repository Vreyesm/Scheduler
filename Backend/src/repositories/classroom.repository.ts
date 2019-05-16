import {DefaultCrudRepository} from '@loopback/repository';
import {Classroom} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ClassroomRepository extends DefaultCrudRepository<
  Classroom,
  typeof Classroom.prototype.ID
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(Classroom, dataSource);
  }
}

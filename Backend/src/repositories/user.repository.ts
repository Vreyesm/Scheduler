import {DefaultCrudRepository} from '@loopback/repository';
import {User} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.ID
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(User, dataSource);
  }
}

import {DefaultCrudRepository} from '@loopback/repository';
import {Section} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SectionRepository extends DefaultCrudRepository<
  Section,
  typeof Section.prototype.ID
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(Section, dataSource);
  }
}

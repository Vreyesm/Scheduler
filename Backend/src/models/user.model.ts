import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Career} from './career.model';

@model({settings: {}})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  ID: number;

  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  @property({
    type: 'number',
    required: true,
  })
  Type: number;

  @property({
    type: 'string',
    required: true,
  })
  Password: string;

  @belongsTo(() => Career)
  CareerId: number;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

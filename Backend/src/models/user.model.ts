import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<User>) {
    super(data);
  }
}

import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Building extends Entity {
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


  constructor(data?: Partial<Building>) {
    super(data);
  }
}

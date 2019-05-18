import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Career extends Entity {
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
  Director: number;


  constructor(data?: Partial<Career>) {
    super(data);
  }
}

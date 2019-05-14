import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Subject extends Entity {
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
  Career: number;


  constructor(data?: Partial<Subject>) {
    super(data);
  }
}

import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Assignation extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  ID: number;

  @property({
    type: 'number',
    required: true,
  })
  Classroom: number;

  @property({
    type: 'number',
    required: true,
  })
  Section: number;

  @property({
    type: 'number',
    required: true,
  })
  Day: number;

  @property({
    type: 'number',
    required: true,
  })
  Block: number;


  constructor(data?: Partial<Assignation>) {
    super(data);
  }
}

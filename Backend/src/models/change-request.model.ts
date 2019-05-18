import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class ChangeRequest extends Entity {
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
  Assignation: number;

  @property({
    type: 'number',
    required: true,
  })
  Classroom: number;

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


  constructor(data?: Partial<ChangeRequest>) {
    super(data);
  }
}

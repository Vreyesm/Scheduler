import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Schedule extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  ID: number;

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  Monday: number[];

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  Tuesday: number[];

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  Wednesday: number[];

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  Thursday: number[];

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  Friday: number[];

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  Saturday: number[];


  constructor(data?: Partial<Schedule>) {
    super(data);
  }
}

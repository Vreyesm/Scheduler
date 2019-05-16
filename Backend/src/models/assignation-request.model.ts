import { Entity, model, property } from '@loopback/repository';

@model({ settings: {} })
export class AssignationRequest extends Entity {
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
  Professor: number;

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

  @property({
    type: 'date',
    required: true,
  })
  ExpirationDate: string;

  @property({
    type: 'string',
  })
  Comment: string;


  constructor(data?: Partial<AssignationRequest>) {
    super(data);
  }
}

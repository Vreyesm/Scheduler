import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Building} from './building.model';

@model({settings: {}})
export class Classroom extends Entity {
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
  Capacity: number;

  @property({
    type: 'number',
    required: true,
  })
  Building: number;

  @property({
    type: 'number',
    required: true,
  })
  Schedule: number;

  @belongsTo(() => Building)
  BuildingId: number;


  constructor(data?: Partial<Classroom>) {
    super(data);
  }
}

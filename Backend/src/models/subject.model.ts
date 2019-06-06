import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {Career} from './career.model';

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

  @belongsTo(() => Career)
  CareerId: number;

  constructor(data?: Partial<Subject>) {
    super(data);
  }
}

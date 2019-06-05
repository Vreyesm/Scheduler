import {Entity, hasMany, model, property} from '@loopback/repository';
import {Classroom} from './classroom.model';

@model({settings: {}})
export class Building extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ID?: number;

  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  @hasMany(() => Classroom)
  Classrooms?: Classroom[];

  constructor(data?: Partial<Building>) {
    super(data);
  }
}

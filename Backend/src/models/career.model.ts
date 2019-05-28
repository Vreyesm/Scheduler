import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Subject} from './subject.model';
import {User} from './user.model';

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

  @hasOne(() => User)
  DirectorId: User;

  @hasMany(() => Subject, {keyTo: 'CareerId'})
  Subjects?: Subject[];

  constructor(data?: Partial<Career>) {
    super(data);
  }
}

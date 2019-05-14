import { Entity, model, property } from '@loopback/repository';

@model({ settings: {} })
export class Section extends Entity {
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
  Professor: number;

  @property({
    type: 'number',
    required: true,
  })
  Subject: number;

  @property({
    type: 'number',
    required: true,
  })
  StudentsQuantity: number;

  constructor(data?: Partial<Section>) {
    super(data);
  }
}

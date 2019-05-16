import { model, property } from '@loopback/repository';
import { Assignation } from '.';

@model({ settings: {} })
export class SpecialAssignation extends Assignation {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  ID: number;

  @property({
    type: 'date',
    required: true,
  })
  ExpirationDate: string;

  constructor(data?: Partial<SpecialAssignation>) {
    super(data);
  }
}

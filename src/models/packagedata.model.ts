import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Packagedata extends Model {
  @property({
    type: 'string',
    required: true,
  })
  postalcode: string;

  @property({
    type: 'number',
    required: true,
  })
  weight: number;
  @property({
    type: 'string',
    required: true,
  })
  paymethod: string;
  @property({
    type: 'string',
    required: true,
  })
  coupon: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Packagedata>) {
    super(data);
  }
}

export interface PackagedataRelations {
  // describe navigational properties here
}

export type PackagedataWithRelations = Packagedata & PackagedataRelations;

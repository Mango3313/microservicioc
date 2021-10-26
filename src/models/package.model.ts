import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Package extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  remitent: string;

  @property({
    type: 'string',
    required: true,
  })
  remitent_address: string;

  @property({
    type: 'string',
    required: true,
  })
  destination_address: string;

  @property({
    type: 'number',
    required: true,
  })
  weight: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Package>) {
    super(data);
  }
}

export interface PackageRelations {
  // describe navigational properties here
}

export type PackageWithRelations = Package & PackageRelations;

import {Entity, model, property} from '@loopback/repository';

@model({settings: {
  strict: false,
  mongodb: {
    collection: 'cities',
  }
}})
export class Cities extends Entity {
  @property({
    type: 'object',
    required: true,
    id: true
  })
  id: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  town: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  postalcode: string;

  @property({
    type: 'string',
    required: true,
  })
  state: string;

  @property({
    type: 'number',
    required: true,
  })
  id_zone: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cities>) {
    super(data);
  }
}

export interface CitiesRelations {
  // describe navigational properties here
}

export type CitiesWithRelations = Cities & CitiesRelations;

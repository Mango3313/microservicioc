import {Entity, model, property} from '@loopback/repository';

@model({settings: {
  strict: false,
  mongodb: {
    collection: 'zones',
  }
}})
export class Zones extends Entity {
  @property({
    type: 'string',
    generated: false,
    id:true,
    required: true,
  })
  _id: string;

  @property({
    type: 'number',
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'number',
    required: true,
  })
  p_1: number;

  @property({
    type: 'number',
    required: true,
  })
  p_2: number;

  @property({
    type: 'number',
    required: true,
  })
  p_3: number;

  @property({
    type: 'number',
    required: true,
  })
  p_4: number;

  @property({
    type: 'number',
    required: true,
  })
  p_5: number;

  @property({
    type: 'number',
    required: true,
  })
  p_6: number;

  @property({
    type: 'number',
    required: true,
  })
  p_7: number;

  @property({
    type: 'number',
    required: true,
  })
  p_8: number;

  @property({
    type: 'number',
    required: true,
  })
  p_e: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Zones>) {
    super(data);
  }
}

export interface ZonesRelations {
  // describe navigational properties here
}

export type ZonesWithRelations = Zones & ZonesRelations;

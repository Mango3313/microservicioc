import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Zones extends Model {
  @property({
    type: 'number',
    id: true,
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

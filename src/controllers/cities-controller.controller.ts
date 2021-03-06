import {
  repository
} from '@loopback/repository';
import {post, requestBody} from '@loopback/rest';
import * as Sentry from "@sentry/node";
import {Packagedata} from '../models';
import {CitiesRepository, ZonesRepository} from '../repositories';

export class CitiesControllerController {
  constructor(
    @repository(CitiesRepository)
    public citiesRepository : CitiesRepository,
    @repository(ZonesRepository)
    public zonesRepository: ZonesRepository,
  ) {}

  @post('/calcularenvio/', {
    responses: {
      '200': {
        description: 'Return the cost and time of a package delivery',
      },
    },
  })
  async calcularEnvio(
    //@param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          type: 'object',
          schema: {
            properties: {
              postalcode: {type: 'string'},
              weight: {type: 'number'},
              paymethod: {type: 'string'},
              coupon: {type: 'string'}
            },
          },
        },
      },
    }) data: Packagedata,
  ) {
    try {
       const cities =  await this.citiesRepository.find({where: {postalcode: data.postalcode},limit:1});
       const tiempoEnvio = this.determinarTiempoEnvio(cities[0].id_zone);
       const prices = await this.zonesRepository.find({where:{id: cities[0].id_zone}});
       const costodeEnvio = this.determinarPrecioEnvio(data.weight,prices[0]);
       let precioFinalEnvio = costodeEnvio;
       let validCoupon = false;
       const appliedCoupons = [];
       if(data.coupon === 'PERRITOFELI'){
        if(cities[0].id_zone === 1 ||cities[0].id_zone === 2 ||cities[0].id_zone === 3 ){
          if(data.paymethod === 'visa' || data.paymethod === 'mastercard'){
            precioFinalEnvio = costodeEnvio * 0.85;
            validCoupon = true;
            appliedCoupons.push('PERRITOFELI');
          }
        }
       }else if(data.coupon === 'NOJADO'){
        if(cities[0].id_zone === 4 ||cities[0].id_zone === 5){
          precioFinalEnvio = costodeEnvio * 0.90;
          validCoupon = true;
          appliedCoupons.push('PERRITOFELI');
        }
       }

       return {
         idZone: cities[0].id_zone,
         tiempoEnvio: tiempoEnvio,
         costodeEnvio: costodeEnvio,
         couponIsValid: validCoupon,
         descuentosAplicados: appliedCoupons,
         precioFinalEnvio:precioFinalEnvio,
        }
    } catch (error) {
      Sentry.captureException(error);
    }
  }
  determinarPrecioEnvio(weight:number,pricess:Object){
    const prices = Object.values(pricess);
    if(weight > 8){
      const fixedPrice = prices[9];
      const timesExtraPrice = (weight-8) * prices[10];
      return fixedPrice + timesExtraPrice;
    }else{
      return prices[weight + 1];
    }
  }
  determinarTiempoEnvio(idZone : number) {
    if(idZone === 1 || idZone === 2 || idZone === 4){
      return "Siguiente dia habil"
    }else if (idZone === 3){
      return "2-3 dias habiles"
    }else{
      return "3 dias habiles"
    }
  }
}
/**
  @post('/cities')
  @response(200, {
    description: 'Cities model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cities)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cities, {
            title: 'NewCities',

          }),
        },
      },
    })
    cities: Cities,
  ): Promise<Cities> {
    return this.citiesRepository.create(cities);
  }

  @get('/cities/count')
  @response(200, {
    description: 'Cities model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cities) where?: Where<Cities>,
  ): Promise<Count> {
    return this.citiesRepository.count(where);
  }

  @get('/cities')
  @response(200, {
    description: 'Array of Cities model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cities, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cities) filter?: Filter<Cities>,
  ): Promise<Cities[]> {
    return this.citiesRepository.find(filter);
  }

  @patch('/cities')
  @response(200, {
    description: 'Cities PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cities, {partial: true}),
        },
      },
    })
    cities: Cities,
    @param.where(Cities) where?: Where<Cities>,
  ): Promise<Count> {
    return this.citiesRepository.updateAll(cities, where);
  }

  @get('/cities/{id}')
  @response(200, {
    description: 'Cities model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cities, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cities, {exclude: 'where'}) filter?: FilterExcludingWhere<Cities>
  ): Promise<Cities> {
    return this.citiesRepository.findById(id, filter);
  }

  @patch('/cities/{id}')
  @response(204, {
    description: 'Cities PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cities, {partial: true}),
        },
      },
    })
    cities: Cities,
  ): Promise<void> {
    await this.citiesRepository.updateById(id, cities);
  }

  @put('/cities/{id}')
  @response(204, {
    description: 'Cities PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cities: Cities,
  ): Promise<void> {
    await this.citiesRepository.replaceById(id, cities);
  }

  @del('/cities/{id}')
  @response(204, {
    description: 'Cities DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.citiesRepository.deleteById(id);
  }
}
**/

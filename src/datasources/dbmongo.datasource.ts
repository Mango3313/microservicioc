import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'dbmongo',
  connector: 'mongodb',
  url: 'mongodb+srv://dbMaster:TDm82Aj%21mdru.FG@cluster0.pofck.mongodb.net/MicroServicioC?retryWrites=true&w=majority',
  //host: 'cluster0.pofck.mongodb.net',
  //port: 27017,
  //user: 'dbMaster',
  //password: 'TDm82Aj%21mdru.FG',
  database: 'cities',
  //useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbmongoDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'dbmongo';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.dbmongo', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

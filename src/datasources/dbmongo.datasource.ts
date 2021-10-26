import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'dbmongo',
  connector: 'mongodb',
  url: 'mongodb://prisma:prisma@127.0.0.1:27017/microservicio?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
  host: 'localhost',
  port: 27017,
  user: 'prisma',
  password: 'prisma',
  database: 'microservicio',
  useNewUrlParser: true
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

import { DataSource } from 'typeorm'

require('dotenv').config()

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.HOST,
        port: Number(process.env.PORTS),
        username: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true
      })

      return dataSource.initialize()
    }
  }
]
const env = process.env;
module.exports =  {
    entities: [ __dirname + '/src/migrations/*.ts' ],
    migrations:  [ __dirname + '/src/migrations/*.ts' ],
    autoSchemaSync: false,
    driver: {
      type: 'mysql',
      host: env.DB_HOST,
      port: env.DB_PORT,
      username: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME
  },
  cli: {
     migrationsDir: __dirname + '/src/migrations'
  }
};

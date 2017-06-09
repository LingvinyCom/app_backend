<<<<<<< HEAD
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
=======
module.exports = [{
  name: 'default',
  driver: {
    type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
  },
  entities: [ 'src/models/*.ts' ],
  migrations:  [ 'src/migrations/*.ts' ],
  autoSchemaSync: false,
  cli: {
    migrationsDir: 'src/migrations'
  }
}];
>>>>>>> a562563e789d41135af7d399385c83bb1b12e24a

import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions'
const config:PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
    username: process.env.PG_USER ,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    //! อ่านไฟล์ Entity ในแต่ละ Folders ย่อยๆ เพื่อไปสร้างเป็น query
    entities:['dist/**/*.entity.js'],
    synchronize: false,
    migrationsTableName: "migrations",
    //! กำหนด Path ตอน run command เพื่อ generate migrations
    migrations: ["dist/src/db/migrations/*.js"],
    cli: {
      //! ตำแหน่งไฟล์ที่จะใช้ run migrations
      "migrationsDir": "src/db/migrations"
  }
}

export default config;
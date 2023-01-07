import path from "path";
import { DataSource } from "typeorm";
import "dotenv/config";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASS,
  database: process.env.PGDATABASE,
  logging: true,
  synchronize: false,
  entities: [path.join(__dirname, "./Entities/**.{js,ts}")],
  migrations: [path.join(__dirname, "./migrations/**.{js,ts}")]
});

export default AppDataSource;

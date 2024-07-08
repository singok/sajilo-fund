import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "sajilo_fund",
    synchronize: false,
    logging: false,
    entities: ['src/entity/*{.ts,.js}']
});

export default AppDataSource;
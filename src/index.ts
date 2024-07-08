import "reflect-metadata";
import express from 'express';
import AppDataSource from "./data-source";
import { apiRouter } from "./routes/api";

const app = express();
app.use(express.json());
const PORT = 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected Successfully.");

        app.use('/', apiRouter);
        
        app.listen(PORT, (): void => {
            console.log(`Server running on ${PORT}`);
        });
    })
    .catch((error) => console.log(error));

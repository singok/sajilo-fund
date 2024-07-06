import "reflect-metadata";
import express, {Request, Response} from 'express';
import AppDataSource from "./data-source";

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected Successfully.");

        const app = express();
        const PORT = 3000;
        
        app.get('/', (req:Request, res:Response): void => {
            res.json({data:"Successfully data retrieved."});
        });
        
        app.listen(PORT, (): void => {
            console.log(`Server running on ${PORT}`);
        });
    })
    .catch((error) => console.log(error));

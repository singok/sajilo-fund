import { Home } from '../entity/Home';
import { Repository } from 'typeorm';
import AppDataSource from '../data-source';
import path from 'path';
import { Request } from 'express';
import fs from 'node:fs';

type HomeType = {[key: string] : any}

class HomeService {
    private homeRepository: Repository<Home>;

    constructor() {
        this.homeRepository = AppDataSource.getRepository(Home);
    }

    getHome = async (): Promise<HomeType> => {
        const result = await this.homeRepository.find({
            select: {
                id: true,
                title: true,
                description: true,
                image: true
            }, 
            order: {
                created_at: "DESC"
            }
        });
        const data: HomeType = {};
        if (result) {
            data.id = result[0].id;
            data.title = result[0].title;
            data.description = result[0].description;
            data.image = path.join(__dirname, '..', '..', 'src/public/uploads/') + result[0].image;
        }
        return data;
    }

    updateHome = async (req: Request): Promise<number|undefined> => {
        const data: HomeType = {};
        data.title = req.body.title;
        data.description = req.body.description;
        if (req.file) {
            data.image = req.file.filename;

            // Remove old image
            const oldImage  = await this.getHome();
            fs.unlink(oldImage.image, (err => {
                if (err) console.log(err);
                else {
                    console.log("\nDeleted file:", oldImage.image);
                }
            }));
        }
        const updateResult = await this.homeRepository.update(req.params.id, data);
        return updateResult.affected;
    }
}

export default HomeService;
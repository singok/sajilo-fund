import { Repository } from "typeorm";
import { About } from "../entity/About";
import AppDataSource from "../data-source";
import { Request } from "express";
import path from "path";
import fs from "node:fs";

type AboutType = {[key: string] : any}

export class AboutService {
    private aboutRepository: Repository<About>;

    constructor() {
        this.aboutRepository = AppDataSource.getRepository(About);
    }

    storeAbout = async (req: Request): Promise<About> => {
        const about = new About();
        about.section_title = req.body.section_title;
        about.title = req.body.title;
        about.description = req.body.description;
        about.order = req.body.order;
        if (req.file) {
            about.image = req.file.filename;
        }
        const result = await this.aboutRepository.save(about);
        return result;
    }

    updateAbout = async (req: Request): Promise<number|undefined> => {
        const updateId = Number(req.params.id);
        const about = await this.aboutRepository.findOne({
            select: {
                image: true
            },
            where: {
                id: updateId
            }
        });

        if (about) {
            // Remove old image
            fs.unlink(path.join(__dirname, '..', '..', 'src/public/uploads/') + about.image, (err => {
                if (err) console.log(err);
                else {
                    console.log("\nDeleted file:", about.image);
                }
            }));
        }
        const data: AboutType = {};
        data.section_title = req.body.section_title;
        data.title = req.body.title;
        data.description = req.body.description;
        data.order = req.body.order;
        if (req.file) {
            data.image = req.file.filename;
        }
        const result = await this.aboutRepository.update(updateId, data);
        return result.affected;
    }
}
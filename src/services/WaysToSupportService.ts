import { Repository } from "typeorm";
import { WaysToSupport } from "../entity/WaysToSupport";
import AppDataSource from "../data-source";
import { Request } from "express";
import path from "node:path";
import fs from "node:fs";

type WaysToSupportType = {[key: string] : any}

export class WaysToSupportService {
    private supportWaysRepository: Repository<WaysToSupport>;

    constructor() {
        this.supportWaysRepository = AppDataSource.getRepository(WaysToSupport);
    }

    storeWaysToSupport = async (req: Request): Promise<WaysToSupport> => {
        const supportWays = new WaysToSupport();
        supportWays.title = req.body.title;
        supportWays.description = req.body.description;
        if (req.file) {
            supportWays.image = req.file.filename;
        }
        const result = await this.supportWaysRepository.save(supportWays);
        return result;
    }

    updateWaysToSupport = async (req: Request): Promise<number|undefined> => {
        const supportWays = await this.supportWaysRepository.findOne({
            select: {
                id: true,
                title: true,
                description: true,
                image: true
            },
            where: {
                id: Number(req.params.id)
            }
        });
        if (supportWays) {
            // Remove old image
            if (req.file && supportWays.image) {
                fs.unlink(path.join(__dirname, '..', '..', 'src/public/uploads/') + supportWays.image, (err => {
                    if (err) console.log(err);
                    else {
                        console.log("\nDeleted file:", supportWays.image);
                    }
                }));
            }
        }
        const data: WaysToSupportType = {};
        data.title = req.body.title;
        data.description = req.body.description;
        if (req.file) {
            data.image = req.file.filename;
        }
        const updateResult = await this.supportWaysRepository.update(Number(req.params.id), data);
        return updateResult.affected;
    }
}
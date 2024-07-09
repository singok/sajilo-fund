import { Repository } from "typeorm";
import { Advertisement } from "../entity/Advertisement";
import AppDataSource from "../data-source";
import { Request } from "express";
import path from "node:path";
import fs from "node:fs";

type AdvertisementType = {[key: string] : any}

export class AdvertisementService {
    private advertisementRepository: Repository<Advertisement>;

    constructor() {
        this.advertisementRepository = AppDataSource.getRepository(Advertisement);
    }

    storeAdvertisement = async (req: Request): Promise<Advertisement> => {
        const advertisement = new Advertisement();
        advertisement.title = req.body.title;
        advertisement.link = req.body.link;
        advertisement.order = req.body.order;
        if (req.file) {
            advertisement.image = req.file.filename;
        }
        const result = await this.advertisementRepository.save(advertisement);
        return result;
    }

    updateAdvertisement = async (req: Request): Promise<number|undefined> => {
        const advertisement = await this.advertisementRepository.findOne({
            select: {
                id: true,
                order: true,
                title: true,
                link: true,
                image: true
            },
            where: {
                id: Number(req.params.id)
            }
        });
        if (advertisement) {
            // Remove old image
            if (req.file && advertisement.image) {
                fs.unlink(path.join(__dirname, '..', '..', 'src/public/uploads/') + advertisement.image, (err => {
                    if (err) console.log(err);
                    else {
                        console.log("\nDeleted file:", advertisement.image);
                    }
                }));
            }
        }
        const data: AdvertisementType = {};
        data.title = req.body.title;
        data.order = req.body.order;
        data.link = req.body.link;
        if (req.file) {
            data.image = req.file.filename;
        }
        const updateResult = await this.advertisementRepository.update(req.params.id, data);
        return updateResult.affected;
    }
}
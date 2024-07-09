import { Request, Response } from "express";
import { AdvertisementService } from "../services/AdvertisementService";
import { Repository } from "typeorm";
import { Advertisement } from "../entity/Advertisement";
import AppDataSource from "../data-source";
import path from "path";
import fs from 'node:fs';

export class AdvertisementController {
    private advertisementService: AdvertisementService;
    private advertisementRepository: Repository<Advertisement>;

    constructor() {
        this.advertisementRepository = AppDataSource.getRepository(Advertisement);
        this.advertisementService = new AdvertisementService;    
    }

    storeAdvertisement = async (req: Request, res: Response) => {
        const advertisement = await this.advertisementService.storeAdvertisement(req);
        res.status(201).json({message: "Successfully advertisement detail inserted."});
    }

    updateAdvertisement = async (req: Request, res: Response) => {
        const advertisement = await this.advertisementService.updateAdvertisement(req);
        res.status(200).json({message: "Successfully advertisement detail updated."});
    }

    updateAdvertisementStatus = async (req: Request, res: Response) => {
        const advertisement = await this.advertisementRepository.update(Number(req.params.id), {is_active: req.body.is_active});
        res.status(200).json({message: "Successfully advertisement status updated."});
    }

    getAdvertisements = async (req: Request, res: Response) => {
        const advertisements = await this.advertisementRepository.find({
            select: {
                id: true,
                order: true,
                title: true,
                link: true,
                is_active: true,
                image: true
            },
            order: {
                created_at: "DESC"
            }
        });
        const result = advertisements.map((row) => {
            row.image = row.image ? path.join(__dirname, '..', '..', 'src/public/uploads/') + row.image : "";
            return row;
        });
        res.status(200).json(result);
    }

    editAdvertisement = async (req: Request, res: Response) => {
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
        if (advertisement && advertisement.image) {
            advertisement.image = path.join(__dirname, '..', '..', 'src/public/uploads/') + advertisement.image;
        }
        res.status(200).json(advertisement);
    }

    deleteAdvertisement = async (req: Request, res: Response) => {
        const deleteId = Number(req.params.id);
        const advertisement = await this.advertisementRepository.findOne({
            select: {
                id: true,
                order: true,
                title: true,
                link: true,
                image: true
            },
            where: {
                id: deleteId
            }
        });
        if (advertisement) {
            // Remove old image
            if (advertisement.image) {
                fs.unlink(path.join(__dirname, '..', '..', 'src/public/uploads/') + advertisement.image, (err => {
                    if (err) console.log(err);
                    else {
                        console.log("\nDeleted file:", advertisement.image);
                    }
                }));
            }

            // Delete data
            const isDeleted = await this.advertisementRepository.delete(deleteId);
        }
        res.status(200).json({message: "Successfully advertisement deleted."});
    }
}
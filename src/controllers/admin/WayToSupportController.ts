import { Request, Response } from "express";
import { WaysToSupportService } from "../../services/WaysToSupportService";
import { Repository } from "typeorm";
import { WaysToSupport } from "../../entity/WaysToSupport";
import AppDataSource from "../../data-source";
import path from "path";
import fs from 'node:fs';

export class WaysToSupportController {
    private supportWaysService: WaysToSupportService;
    private supportWaysRepository: Repository<WaysToSupport>;

    constructor() {
        this.supportWaysRepository = AppDataSource.getRepository(WaysToSupport);
        this.supportWaysService = new WaysToSupportService;    
    }

    storeWaysToSupport = async (req: Request, res: Response) => {
        const result = await this.supportWaysService.storeWaysToSupport(req);
        res.status(201).json({message: "Successfully ways to support detail inserted."});
    }

    updateWaysToSupport = async (req: Request, res: Response) => {
        const result = await this.supportWaysService.updateWaysToSupport(req);
        res.status(200).json({message: "Successfully ways to support detail updated."});
    }

    getWaysToSupport = async (req: Request, res: Response) => {
        const supportWays = await this.supportWaysRepository.find({
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
        const result = supportWays.map((row) => {
            row.image = row.image ? path.join(__dirname, '..', '..', 'src/public/uploads/') + row.image : "";
            return row;
        });
        res.status(200).json(result);
    }

    editWaysToSupport = async (req: Request, res: Response) => {
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
        if (supportWays && supportWays.image) {
            supportWays.image = path.join(__dirname, '..', '..', 'src/public/uploads/') + supportWays.image;
        }
        res.status(200).json(supportWays);
    }

    deleteWaysToSupport = async (req: Request, res: Response) => {
        const deleteId = Number(req.params.id);
        const supportWays = await this.supportWaysRepository.findOne({
            select: {
                id: true,
                title: true,
                description: true,
                image: true
            },
            where: {
                id: deleteId
            }
        });
        if (supportWays) {
            // Remove old image
            if (supportWays.image) {
                fs.unlink(path.join(__dirname, '..', '..', 'src/public/uploads/') + supportWays.image, (err => {
                    if (err) console.log(err);
                    else {
                        console.log("\nDeleted file:", supportWays.image);
                    }
                }));
            }

            // Delete data
            const isDeleted = await this.supportWaysRepository.delete(deleteId);
        }
        res.status(200).json({message: "Successfully ways to support deleted."});
    }
}
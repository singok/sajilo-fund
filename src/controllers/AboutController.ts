import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { About } from "../entity/About";
import { AboutService } from "../services/AboutService";
import { Request, Response } from "express";
import path from "node:path";
import fs from "node:fs";

export class AboutController {
    private aboutRepository: Repository<About>;
    private aboutService : AboutService;

    constructor() {
        this.aboutRepository = AppDataSource.getRepository(About);
        this.aboutService = new AboutService;
    }

    storeAbout = async (req: Request, res: Response) => {
        const result = await this.aboutService.storeAbout(req);
        res.status(201).json({message: "Successfully about detail inserted."});
    }

    updateAbout = async (req: Request, res: Response) => {
        const result = await this.aboutService.updateAbout(req);
        res.status(200).json({message: "Successfully about detail updated."});
    }

    getAbouts = async (req: Request, res: Response) => {
        const abouts = await this.aboutRepository.find({
            select: {
                id: true,
                section_title: true,
                title: true,
                description: true,
                is_active: true,
                order: true,
                image: true
            },
            order: {
                created_at: "DESC"
            }
        });
        const result = abouts.map((item) => {
            item.image = path.join(__dirname, '..', '..', 'src/public/uploads') + item.image;
            return item;
        });
        res.status(200).json(result);
    }

    deleteAbout = async (req: Request, res: Response) => {
        const about = await this.aboutRepository.findOne({
            select: {
                image: true
            },
            where: {
                id: Number(req.params.id)
            }
        });
        if (about) {
            fs.unlink(path.join(__dirname, '..', '..', 'src/public/uploads') + about.image, (err) => {
                if (err) console.log(err);
                else {
                    console.log("\nDeleted file:", about.image);
                }
            }) 
        }
        const result = await this.aboutRepository.delete(Number(req.params.id));
        res.status(200).json({message: "Successfully about deleted."});
    }

    editAbout = async (req: Request, res: Response) => {
        const about = await this.aboutRepository.findOne({
            select: {
                id: true,
                section_title: true,
                title: true,
                description: true,
                order: true,
                image: true
            },
            where: {
                id: Number(req.params.id)
            }
        });
        let result = {};
        if (about) {
            result = {
                id: about.id,
                section_title: about.section_title,
                title: about.title,
                description: about.description,
                order: about.order,
                image: path.join(__dirname, '..', '..', 'src/public/uploads') + about.image
            }
        }
        res.status(200).json(result);
    }

    updateAboutStatus = async (req: Request, res: Response) => {
        const result = await this.aboutRepository.update(Number(req.params.id), {is_active: req.body.is_active});
        res.status(200).json({message: "Successfully about status changed."});
    }
}   
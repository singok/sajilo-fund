import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { Category } from "../entity/Category";
import { Repository } from "typeorm";

export class CategoryController {
    categoryRepository: Repository<Category>;
    
    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category);
    }

    getCategories = async (req: Request, res: Response) => {
        const categories = await this.categoryRepository.find({
            select: {
                id: true,
                name: true
            },
            order: {
                created_at: "DESC"
            }
        });
        res.status(200).json(categories);
    }

    storeCategory = async (req: Request, res: Response) => {
        const category = new Category();
        category.name = req.body.name;
        const categoryInserted = await this.categoryRepository.save(category);
        res.status(201).json({message: "Successfully category inserted."});

    }

    editCategory = async (req: Request, res: Response) => {
        const category = await this.categoryRepository.findOne({
            select: {
                id: true,
                name: true
            },
            where: {
                id : Number(req.params.id)
            }
        });
        res.status(200).json(category);
    }

    updateCategory = async (req: Request, res: Response) => {
        const categoryUpdated = await this.categoryRepository.update(Number(req.params.id), req.body);
        res.status(200).json({message: "Successfully category updated."});
    }

    deleteCategory = async (req: Request, res: Response) => {
        const categoryDeleted = await this.categoryRepository.delete(Number(req.params.id));
        res.status(200).json({message: "Successfully category deleted."});
    }
}
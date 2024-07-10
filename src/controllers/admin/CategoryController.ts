import { Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Category } from "../../entity/Category";
import { Repository } from "typeorm";
import { CategoryService } from "../../services/CategoryService";

export class CategoryController {
    private categoryRepository: Repository<Category>;
    private categoryService: CategoryService;

    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category);
        this.categoryService = new CategoryService;
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
        const result = await this.categoryService.storeCategory(req);
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
        const result = await this.categoryService.updateCategory(req);
        res.status(200).json({message: "Successfully category updated."});
    }

    deleteCategory = async (req: Request, res: Response) => {
        const categoryDeleted = await this.categoryRepository.delete(Number(req.params.id));
        res.status(200).json({message: "Successfully category deleted."});
    }
}
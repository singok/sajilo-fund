import { Repository } from "typeorm";
import { Category } from "../entity/Category";
import AppDataSource from "../data-source";
import { Request } from "express";

export class CategoryService {
    private categoryRepository: Repository<Category>;

    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category);
    }

    storeCategory = async (req: Request): Promise<Category> => {
        const category = new Category();
        category.name = req.body.name;
        const result = await this.categoryRepository.save(Category);
        return result;
    }

    updateCategory = async (req: Request): Promise<number|undefined> => {
        const result = await this.categoryRepository.update(Number(req.params.id), req.body.name);
        return result.affected;
    }
}
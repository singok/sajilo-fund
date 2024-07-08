import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { Role } from "../entity/Role";
import { Repository } from "typeorm";

export class RoleController {
    roleRepository: Repository<Role>;
    
    constructor() {
        this.roleRepository = AppDataSource.getRepository(Role);
    }

    getRoles = async (req: Request, res: Response) => {
        const roles = await this.roleRepository.find({
            select: {
                id: true,
                name: true
            },
            order: {
                created_at: "DESC"
            }
        });
        res.status(200).json(roles);
    }

    storeRole = async (req: Request, res: Response) => {
        const role = new Role();
        role.name = req.body.name;
        const roleInserted = await this.roleRepository.save(role);
        res.status(201).json({message: "Successfully role inserted."});

    }

    editRole = async (req: Request, res: Response) => {
        const role = await this.roleRepository.findOne({
            select: {
                id: true,
                name: true
            },
            where: {
                id : Number(req.params.id)
            }
        });
        res.status(200).json(role);
    }

    updateRole = async (req: Request, res: Response) => {
        const roleUpdated = await this.roleRepository.update(Number(req.params.id), req.body);
        res.status(200).json({message: "Successfully role updated."});
    }

    deleteRole = async (req: Request, res: Response) => {
        const roleDeleted = await this.roleRepository.delete(Number(req.params.id));
        res.status(200).json({message: "Successfully role deleted."});
    }
}
import { Request, Response } from "express"; 
import HomeService from "../services/HomeService";

export class HomeController {
    private homeService: HomeService;
    
    constructor() {
        this.homeService = new HomeService();
    }

    getHome = async (req: Request, res: Response) => {
        const result = await this.homeService.getHome();
        res.status(200).json(result);
    }

    updateHome = async (req: Request, res: Response) => {
        const result = await this.homeService.updateHome(req);
        res.status(200).send({message: "Successfully home details updated."});
    }
}
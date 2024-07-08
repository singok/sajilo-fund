import express, { Router} from "express";
import { RoleController } from "../controllers/RoleController";
import { CategoryController } from "../controllers/CategoryController";
import { fileUpload } from "../controllers/FileOperation";
import { HomeController } from "../controllers/HomeController";

const router: Router = express.Router();

// START : ROLE
router.get('/role', new RoleController().getRoles);
router.post('/role', new RoleController().storeRole);
router.get('/role/:id', new RoleController().editRole);
router.put('/role/:id', new RoleController().updateRole);
router.delete('/role/:id', new RoleController().deleteRole);
// END : ROLE

// START : CATEGORY
router.get('/category', new CategoryController().getCategories);
router.post('/category', new CategoryController().storeCategory);
router.get('/category/:id', new CategoryController().editCategory);
router.put('/category/:id', new CategoryController().updateCategory);
router.delete('/category/:id', new CategoryController().deleteCategory);
// END : CATEGORY

// START : HOME
router.put('/home/:id', fileUpload.single('image'), new HomeController().updateHome);
router.get('/home', new HomeController().getHome);
// END : HOME

export const apiRouter: Router = router;


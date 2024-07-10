import express, { Router} from "express";
import { RoleController } from "../controllers/admin/RoleController";
import { CategoryController } from "../controllers/admin/CategoryController";
import { fileUpload } from "../controllers/admin/FileOperation";
import { HomeController } from "../controllers/admin/HomeController";
import { AdvertisementController } from "../controllers/admin/AdvertisementController";
import { AboutController } from "../controllers/admin/AboutController";
import { WaysToSupportController } from "../controllers/admin/WayToSupportController";

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

// START : ADVERTISEMENT
router.post('/advertisement', fileUpload.single('image'), new AdvertisementController().storeAdvertisement);
router.put('/advertisement/:id', fileUpload.single('image'), new AdvertisementController().updateAdvertisement);
router.get('/advertisement', new AdvertisementController().getAdvertisements);
router.get('/advertisement/:id', new AdvertisementController().editAdvertisement);
router.delete('/advertisement/:id', new AdvertisementController().deleteAdvertisement);
router.patch('/advertisement/:id', new AdvertisementController().updateAdvertisementStatus);
// END : ADVERTISEMENT

// START : ABOUT
router.post('/about', fileUpload.single('image'), new AboutController().storeAbout);
router.get('/about', new AboutController().getAbouts);
router.get('/about/:id', new AboutController().editAbout);
router.delete('/about/:id', new AboutController().deleteAbout);
router.put('/about/:id', fileUpload.single('image'), new AboutController().updateAbout);
router.patch('/about/:id', new AboutController().updateAboutStatus);
// END : ABOUT

// START : WAYS TO SUPPORT
router.post('/ways-to-support', fileUpload.single('image'), new WaysToSupportController().storeWaysToSupport);
router.put('/ways-to-support/:id', fileUpload.single('image'), new WaysToSupportController().updateWaysToSupport);
router.get('/ways-to-support', new WaysToSupportController().getWaysToSupport);
router.get('/ways-to-support/:id', new WaysToSupportController().editWaysToSupport);
router.delete('/ways-to-support/:id', new WaysToSupportController().deleteWaysToSupport);
// END : WAYS TO SUPPORT

export const apiRouter: Router = router;


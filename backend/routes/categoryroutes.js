import express from "express"
const router = express.Router();
import requireSignIn from "../middlewares/authMiddleware.js"
import { isAdmin } from "../middlewares/authMiddleware.js";
import { categoryController, deleteCategory, getcategoryController, singleCategory } from "../controllers/categoryController.js";
import {updateCategoryController} from "../controllers/categoryController.js"
// routes
// creat category

router.post('/create-category',  requireSignIn, isAdmin,categoryController);

// udate category
router.put('/update-category/:id', requireSignIn,isAdmin, updateCategoryController)

// get all category
router.get('/get-category' , getcategoryController);

// get single category
router.get('/single-category/:slug', singleCategory);

// delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategory);

export default router;

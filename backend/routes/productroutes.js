import express from "express";
import requireSignIn, { isAdmin } from "../middlewares/authMiddleware.js";
import formidable from 'express-formidable';
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getproductController, getproductphoto, getsingleproductController, productCategoryController, productFilterController, relativeProductController, searchProductController, updateProductController } from "../controllers/productController.js";
const router = express.Router();
router.use(formidable());
// router
// ,requireSignIn,isAdmin,formidable()

// create product
router.post('/create-product',createProductController);

// update product
router.put('/update-product/:id',updateProductController);


// get product
router.get('/get-product',getproductController);

// get single product
router.get('/get-product/:slug',getsingleproductController);

// getphpto
router.get('/product-photo/:id',getproductphoto);

// delete 
router.delete('/Delete-product/:id', deleteProductController);

// filter product
router.post('/product-filters', productFilterController);

// search Product
router.get('/search/:keyword', searchProductController);


// similar Product
router.get('/related-product/:pid/:cid', relativeProductController);

// categorywise product
router.get('/product-category/:slug',productCategoryController);

// payment route
// token
router.get('/braintree/token', braintreeTokenController);

// payments
router.post('/braintree/payment', braintreePaymentController);

export default router;
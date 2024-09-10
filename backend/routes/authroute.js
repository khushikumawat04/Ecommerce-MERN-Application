import express from "express";
import {registerController,loginController, testController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from "../controllers/authController.js"
import requireSignIn from "../middlewares/authMiddleware.js"
import { isAdmin } from "../middlewares/authMiddleware.js";
// router object
const router = express.Router();

// routing
// Ragister || method post
router.post('/register',registerController)

// login || post
router.post('/login', loginController)

// test route
router.get('/test',requireSignIn, isAdmin, testController);

//  user protected route
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})
// admin route
router.get('/admin-auth',requireSignIn, isAdmin, (req,res)=>{
    res.status(200).send({ok:true});
})


// update Profile
router.put('/profile', requireSignIn, updateProfileController);

// get orders
router.get('/orders', requireSignIn, getOrdersController);
// get All orders
router.get('/all-orders', requireSignIn,isAdmin, getAllOrdersController);

//  order status update
router.put('/order-status/:orderid', requireSignIn,isAdmin, orderStatusController)
export default router
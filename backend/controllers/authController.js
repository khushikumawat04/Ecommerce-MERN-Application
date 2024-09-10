import { comparepassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import OrderModel from "../models/OrderModel.js";
export const registerController = async(req,res)=>{

    try {

        const {name,email,password,phone,address} =req.body
        if(!name){
            return res.send({message: "Name is required"})
        }
        if(!email){
            return res.send({message: "email is required"})
        }
        if(!password){
            return res.send({message: "password is required"})
        }
        if(!phone){
            return res.send({message: "phone is required"})
        }
        if(!address){
            return res.send({message: "address is required"})
        }

        // existing user
        const existinguser = await userModel.findOne({email})
        if(existinguser){
            return res.status(201).send({
                success:false,
                message: "This email is already exists"
            })
        }

        // ragister user
        const hashedpassword = await hashPassword(password)
        // save 
        const user = await new userModel({name,email,phone,address, password:hashedpassword}).save();
        console.log(user);
        res.status(200).send(
            {
                success: true,
                message: "User ragister succesfully",
                user
            }
        )


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Error in ragistration"

        })
    }


 }

//  post Login
export const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body
        // validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message: "Invalid email or password"
            })
        }

        // check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message: "Email is not registered",
                
            })
        }

        const match = await comparepassword(password,user.password)
        if(!match){
            return res.status(401).send({
                success:false,
                message: "Invalid password"
            })
        
        }

        // token
        const token = await jwt.sign({_id:user._id},process.env.JWT_Secret,{expiresIn:"7d"})
        res.status(200).send({
            success:true,
            message: "login successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Error in login",
            error
        })
        
    }

}

// test controller
export const testController = (req,res) =>{
  try {
    res.send("Protected Routes");
    
  } catch (error) {
    res.json({error});
    console.log(error);
    
  }
}

// update profile
export const updateProfileController = async(req,res) => {
    try {
        const {name,email,password,address,phone} = req.body;
        const user = await userModel.findById(req.user._id);
        // password
        if(password && password.length<6){
            return res.json({message: "Password is required and 6 character long"});
        }
        const hashedpassword = password ? await hashPassword(password):undefined;
        const updateUser = await userModel.findByIdAndUpdate(req.user._id,{
            name: name || user.name,
            password:  hashedpassword || user.password,
            phone: phone || user.phone,
            address: address || user.address
       },{new:true});
       res.status(200).send({
        success: true,
        message: "Profile Updated Successfully",
        updateUser

       })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while updating product",
            error
        })
    }

}


// get order
export const getOrdersController = async(req,res) =>{
    try {
         const  orders =  await OrderModel.find({buyer:req.user._id}).populate("products","-photo").populate("buyer","name");
           res.json(orders);
        
    } catch (error) {
        console.log(error);
        res.status(500).send( {
            success: false,
            message: "Error while getting Orders",
            error
        })
        
    }
}

// get all orders
export const getAllOrdersController = async(req,res) =>{
    try {
         const  orders =  await OrderModel.find({}).populate("products","-photo").populate("buyer","name").sort({createdAt:"-1"});
           res.json(orders);
        
    } catch (error) {
        console.log(error);
        res.status(500).send( {
            success: false,
            message: "Error while getting Orders",
            error
        })
        
    }
}

// order status update
// export const orderStatusController= async(req,res) =>{
//     try {
//         const {orderid} = req.params;
//         const {status} =  req.body;
//         const orders = await OrderModel.findByIdAndUpdate(orderid,{status},{new:true})
//         res.json(orders);
         
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success:false,
//             message:"Erro while updating order",
//             error
//         })
        
//     }

// }
export const orderStatusController= async(req,res) =>{
    try {
        const {orderid} = req.params;
        const {status} =  req.body;
        const orders = await OrderModel.findByIdAndUpdate(orderid,{status},{new:true})
        res.json(orders);
         
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Erro while updating order",
            error
        })
        
    }

}

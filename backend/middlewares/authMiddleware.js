import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";


// protected route tokens
// const requireSignIn = async (req,res,next) => {
//     try {
//         console.log('Token:', req.headers.authorization);
//     const decode =  jwt.verify(req.headers.authorization.split(' ')[1],process.env.JWT_Secret )
    
//     req.user = decode;
//     console.log(decode);
//     next();
  
        
//     } catch (error) {
//         console.log("error is",error)
        
//     }
//  }

const requireSignIn = async (req, res, next) => {
    try {
      
      console.log('Request Headers:', req.headers);
      const authorizationHeader = req.headers.authorization;
  
      if (!authorizationHeader) {
        console.log("missing");
        console.log(authorizationHeader);
        return res.status(401).json({ message: 'Authorization header is missing' });
      }
  
      // Log the Authorization header and token
      console.log('Token:', authorizationHeader);
  
      const token = authorizationHeader.split(' ')[1]; // Extract the token
      const decode = jwt.verify(token, process.env.JWT_Secret);
      req.user = decode;
      next();
    } catch (error) {
      console.log('Error:', error);
      // Handle the error, e.g., send an error response
    }
  };
  

//  admin access

 export default requireSignIn;
 export const isAdmin = async (req,res,next) =>{
    console.log("hi");
    try {
        const user = await userModel.findById(req.user._id);
        console.log("User found:", user); // Log the user object to check if it's retrieved correctly
    
        if (user.role !== 1) {
            console.log("User is not an admin");
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access"
            });
        } else {
            next();
            console.log("User is an admin");
        }
    } catch (error) {
        console.log("Error:", error);
        res.status(401).send({
            success:false,
            error,
            message: "Error in admin"
        });
    }   
 }
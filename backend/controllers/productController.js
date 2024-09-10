import slugify from "slugify";
import ProductModel from "../models/ProductModel.js";
import fs from 'fs';
import CategoryModel from "../models/CategoryModel.js";
import braintree from "braintree";
import OrderModel from "../models/OrderModel.js";
import dotenv from "dotenv";
dotenv.config();

// payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey:process.env. BRAINTREE_PRIVATE_KEY,
  });
// create product
export const createProductController =  async(req, res) => {
    // res.status(200).json({ message: "Hello, World!" });
    console.log(req.fields);

    try {
        const { name, slug, description, category, quantity, shipping, price } = req.fields;
        const { photo } = req.files;
        

        // Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case !photo || photo.size > 3000000:
                return res.status(500).send({ error: "Photo is Required and should be less than 1mb" });
        }

        const products = new ProductModel({
            ...req.fields,
            price, // Include the price field here
            slug: slugify(name.trim())
        });

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: "Product created Successfully",
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating product",
            error
        });
    }
}

// upadate
export const updateProductController = async(req,res) =>{

    
    try {
        const { name, slug, description, category, quantity, shipping, price } = req.fields;
        const { photo } = req.files;

        // Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case !shipping:
                return res.status(500).send({ error: "shipping is Required" });
            case !photo:
                return res.status(500).send({ error: "Photo is Required and should be less than 1mb" });
        }

        const products = await ProductModel.findByIdAndUpdate(req.params.id,{
            ...req.fields,slug: slugify(name)},{new: true})

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: "Product updated Successfully",
            products
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating product",
            error
        })
        
    }
}

// get product
export const getproductController = async(req,res) =>{
    try {
        const products = await ProductModel.find({})
        .populate("category")
        .select("-photo").limit(12)
        .sort({createdAt : -1});
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: "All Products",
            products
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting product",
            error: error.message
        })
        
    }
}

// get single product
export const getsingleproductController = async(req,res)=>{
    try {

        
        const product = await ProductModel.findOne({slug:req.params.slug}).select("-photo").populate("category");
        // console.log('Retrieved product:', product);
        // console.log('Received slug:', req.params.slug);
        res.status(200).send({
            success:true,
            message: "Single product fetdched",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting single product",
            error
        })
        
    }
}

// getphoto
export const getproductphoto = async(req,res)=>{
    try {
        const product = await ProductModel.findById(req.params.id).select("photo")
        if(product.photo.data){
            res.set('Content-Type', product.photo.contentType);
            res.status(200).send(product.photo.data);

            
        }
    } catch (error) {
        console.log("error");
         res.send({
            success:false,
            message: "Error while getting photo",
            error
        })
        
    }

}

// delete product
export const deleteProductController = async(req,res)=>{
    try {
        await ProductModel.findByIdAndDelete(req.params.id).select("-photo")
        res.status(200).send({
            success:true,
            message: "Product delete succesfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Error while deleting product",
            error
        })
        
    }

}

//product filer
// export const productFilterController = async(req,res) =>{
            
//     try {
//         const {checked,radio} = req.body;
//         let args = {};
//         if(checked.length>0) args.category = checked;
//         if(radio.length) args.price = {$gte: radio[0], $lte: radio[1]};
//         const products = await ProductModel.find(args);
//         res.status(200).send({
//             success: true,
//             products,
//         })
        
//     } catch (error) {
//         console.log(error);
//         res.status(400).send({
//             success: false,
//             message: "Error in Filtering Products",
//             error
//         })
//     }
// }
export const productFilterController = async (req, res) => {
    const { name, age } = req.body;

    // Check if name and age are provided
    if (!name || !age) {
      return res.status(400).json({
        success: false,
        message: 'Name and age are required in the request body.',
      });
    }
  
    // Send a success response with the received data
    res.status(200).json({
      success: true,
      message: 'POST request received successfully.',
    //   data: {
    //     name,
    //     age,
    //   },
    });
    // try {
    //   const { checked, radio } = req.body;
    //   let args = {};
    //   if (checked.length > 0) args.category = checked;
    //   if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    //   const products = await ProductModel.find(args);
    //   res.status(200).send({
    //     success: true,
    //     products,
    //   });
    // } catch (error) {
    //   console.log(error);
    //   res.status(400).send({
    //     success: false,
    //     message: "Error WHile Filtering Products",
    //     error,
    //   });
    // }
  };


//  searchProductController
// export const searchProductController = async (req, res) => {
//     try {
//         const { keywords } = req.params;
        
//         // Validate if 'keywords' is present and is a string
//         if (typeof keywords !== 'string') {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid 'keywords' parameter. It should be a string."
//             });
//         }

//         const result = await ProductModel.find({
//             $or: [
//                 { name: { $regex: keywords, $options: "i" } },
//                 { description: { $regex: keywords, $options: "i" } },
//             ]
//         }).select("-photo");

//         res.json(result);
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({
//             success: false,
//             message: "Error in search Product Api",
//             error
//         });
//     }
// }



export const searchProductController = async (req, res) => {
    try {
      const { keyword } = req.params;
      const resutls = await ProductModel
        .find({
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        })
        .select("-photo");
      res.json(resutls);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error In Search Product API",
        error,
      });
    }
  };

//   relativeproduct
export const relativeProductController = async(req,res) =>{
    try {
        const { pid, cid } = req.params;
        const products = await ProductModel
          .find({
            category: cid,
            _id: { $ne: pid },
          })
          .select("-photo")
          .populate("category");
        res.status(200).send({
          success: true,
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "error while geting related product",
          error,
        });
      }
}

// get Producr by category
export const productCategoryController = async(req,res)=>{
    try {
          const category  = await CategoryModel.findOne({slug:req.params.slug})
          const products = await ProductModel.find({category}).populate('category')
          res.status(200).send({
              success: true,
              category,
              products
          })
    } catch (error) {
      console.log(error);
      res.status(400).send({
          success: false,
          error,
          message: "Error While getting products"
      })
      
    }
}


// payment gateway
export const  braintreeTokenController = async(req,res)=>{
           
    try {
        gateway.clientToken.generate({},function(err,response){
            if(err){
                res.status(500).send(err);
            }
            else{
                res.send(response);
            }
        })
        
    } catch (error) {
        console.log(error);
        
    }
}



// payments
// export const  braintreePaymentController = async(req,res) => {
//           try {
//                 const {cart} = req.body; 
//                 let total = 0;
//                 cart.map((i) => {
//                     total+= i.price
//                 }) ;
//             // let newTransaction = await  gateway.transaction.sale({
//             //     amount: total,
//             //     paymentMethodNonce: nonce,
//             //     options: {
//             //         submitForSettlement: true
//             //     }
//             // },
//             // function(error,result){
//             //     if(result){
//             //         const order = new OrderModel({
//             //              products: cart,
//             //              payment: result,
//             //              buyer: req.user._id
//             //         }).save()
//             //         res.json({ok:true})
//             //     }
//             //     else{
//             //         res.status(500).send(error);
//             //     }
                
//             // })
//             const order = new OrderModel({
                
//                 cart // Include the price field here
                
//             });
//             await order.save();
//             res.status(201).send({
//                 success: true,
//                 message: "order Successfully",
//                 order
//             });
// } catch (error) {
//             console.log(error);
            
//           }
// }



//         const order = new OrderModel({
//             products: cart,
//             payment: result,
//             buyer: req.user._id
//         });

//         await order.save();

//         res.json({ ok: true });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error);
//     }
// };

export const braintreePaymentController = async (req, res) => {
    try {
        const { cart } = req.body;
        let total = 0;
        cart.forEach((item) => {
            total += item.price; // Assuming each item has a 'price' property
        });
        console.log(item); 

        
        const order = new OrderModel({
            products: cart,
            totalPrice: total,
            buyer: req.user._id // Assuming req.user._id contains the buyer's ID
        });

        await order.save();

        res.status(201).send({
            success: true,
            message: "Order successfully created",
            cart
        });
       
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};






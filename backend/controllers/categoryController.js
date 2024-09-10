import CategoryModel from "../models/CategoryModel.js";
import slugify from "slugify";

// create category
export  const categoryController = async(req,res) =>{
    try {
        const {name} = req.body;
        console.log(typeof name);
        if(!name){
            return res.status(401).send({message:"Name is Required"})
        }
        const existingcategory  = await CategoryModel.findOne({name});
        if(existingcategory){
            return res.status(200).send({
                success:true,
                message: "Category Already Exists"
            })
        }
        const category = await new CategoryModel({name,slug: slugify(name.trim())}).save();
        res.status(201).send({
            success: true,
            message:"Category updated succesfully",
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in category"
        })
    }

}

// udatecategory
export const updateCategoryController = async (req,res) => {
    try {
        const {name} = req.body;
        const id = req.params.id
        const category = await CategoryModel.findByIdAndUpdate(id, {name,slug: slugify(name.trim())} , {new:true})
        res.status(201).send({
            success: true,
            message:"new category created",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating category"
        })
        
    }

}

// get all category
export const getcategoryController = async (re,res) => {
    try {
        const category = await CategoryModel.find({})
        res.status(200).send({
            success:true,
            message: "All category List",
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting  all category"
        })
        
    }
}

// single category

export const  singleCategory = async(req,res) =>{
    try {
        const slug = req.params.slug;
        const category = await CategoryModel.findOne({slug});
        res.status(200).send({
            success: true,
            message: " Get single category  succesfully",
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting  single category"
        })

        
    }

}

// delete category
export const deleteCategory = async(req,res) => {

    try {
        const id = req.params.id
        await CategoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message: "Category Deleted Succesfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting  deleting category"
        })
        
    }

}
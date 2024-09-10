import mongoose from "mongoose";
import CategoryModel from "../models/CategoryModel.js";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required: true
    
    },price:{
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    quantity:{
        type:Number,
        required:true
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    shipping:{
        type: Boolean
    }
},{timestamps:true})
 export default mongoose.model('Product', productSchema);
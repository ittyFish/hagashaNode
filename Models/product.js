import mongoose from "mongoose";
import Joi from "joi";

const ProductSchema=mongoose.Schema({
    code:String,
    name:String,
    price:Number,
    describe:String,
    imgUrl:String,
    prodDate:{type:Date,default:Date.now()}
})

export const Product= mongoose.model("products",ProductSchema)

export const productValidator=(_prod)=>{
    const schema=Joi.object({
        name:Joi.string().min(2).max(15).required(),
        code:Joi.string(),
        price:Joi.number().min(5).max(10000),
        describe:Joi.string()
    })
    return schema.validate(_prod);
} 
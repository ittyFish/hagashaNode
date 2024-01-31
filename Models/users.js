import Joi from "joi";
import mongoose from "mongoose";


let userSchema =mongoose.Schema({
    userName:String,
    password:String,
    email:String,
    role:{type:String , default:"user" },
    enterDate:{type:Date,default:Date.now()}

})

export const User=mongoose.model("users",userSchema);

export const userValidatorForLogin = (_user) =>{
    const schema=Joi.object({
        userName:Joi.string().min(2).max(15).required(),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')).required()
    })
    return schema.validate(_user);
}

export const userValidaror=(_user)=>{
    const schema=Joi.object({
        userName:Joi.string().min(2).max(15).required(),
        password:Joi.string().pattern(new RegExp(`^[a-zA-Z0-9]{3,15}$`)).required(),
        email:Joi.string().email(),
        role:Joi.string()
        //tz:Joi.string().min(9).max(9).pattern(new RegExp(`/^[0-9]{9}$`))
    })
    return schema.validate(_user);
} 

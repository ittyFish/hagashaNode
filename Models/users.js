import Joi from "joi";
import mongoose from "mongoose";

const minimumCourse=mongoose.Schema({
    name:String,
    numLessons:Number,
    speakerFullName:String,
    tags:[String],
})

let userSchema =mongoose.Schema({
    tz:String,
    userName:String,
    password:String,
    email:String,
    courses:[minimumCourse],
    role:{type:String , default:"user" }

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
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')).required(),
        tz:Joi.string().min(9).max(9).pattern('/^[0-9]{9}$').required()
    })
    return schema.validate(_user);
} 

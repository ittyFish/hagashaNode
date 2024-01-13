import mongoose from "mongoose";

const SpeakerSchema = mongoose.Schema({
    name:String,
    phon:String,
    tz:String,
    startDate:{type:Date,default:Date.now()}
})

const courseSchema=mongoose.Schema({
    name:String,
    price:Number,
    numLessons:Number,
    speaker:SpeakerSchema,
    tags:[String],
    startDate:{type:Date,default:Date.now()}
})

export const Course= mongoose.model("courses",courseSchema)
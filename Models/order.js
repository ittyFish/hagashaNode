import mongoose from "mongoose";

const minProduct=mongoose.Schema({
    code:String,
    name:String,
    price:Number,
    qty:Number
})

const OrderSchema=mongoose.Schema({
    ordDate:{type:Date,default:Date.now()},
    toDate:{type:Date,default:Date.now()},
    adrress:String,
    userCode:String,
    orderedProducts:[minProduct],
    isExit:{type:Boolean,default:false}
})

export const Order= mongoose.model("orders",OrderSchema)
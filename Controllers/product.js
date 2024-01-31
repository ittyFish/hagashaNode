import mongoose from "mongoose";
import { Product } from "../Models/product.js";
import { productValidator } from "../Models/product.js";

const getAllProducts=async (req,res)=>{
    let {search} =req.query;
    let perPage=req.query.perPage||40;
    let page = req.query.page || 1;

    //let ex1= new RegExp(`${search}`)

    try{
        let filter={};
        if(search){
           filter.name=ex1; 
        }
        

        let allProducts =await Product.find(filter)
        .skip((page-1)*(perPage))
        .limit(perPage)

        res.json(allProducts)
    }
    catch(err){
        res.status(400).json({type:"error",message:"cannot bring all products"})
    }
}

const getProductById = async (req,res) =>{
    try{
       let { id }=req.params;
       if(!mongoose.isValidObjectId(id))
         return  res.status(400).json({type:"id error",message:"id is not valid"})
      const product = await Product.findById(id);

      if(!product)
       return res.status(400).json({type:"id not find error",message:"id is not find"});

       return res.json(product)
    }
    catch(err){
        res.status(400).json({type:"error",message:err.message})
    }
}

const addProduct = async (req,res) => {
    try{
        let {code,name,price,describe,imgUrl,prodDate}=req.body;
        if(!name||!price)
        return  res.status(400).json({type:"miisied perams",message:"name or price --!push it"})


        let sameProduct=await Product.findOne({name,price});
        if(sameProduct)
          return  res.status(400).json({type:"same Product",message:"same details"})

        let newProd = await Product.create({code,name,price,describe,imgUrl,prodDate})
        res.json(newProd)
    }
    catch(err){
        res.status(400).json({type:"error",message:err.message})
    }
}

 const deleteProductById = async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "id error", message: "id is not valid" });
        const prod = await Product.findById(id);
        if (!prod)
            return res.status(404).json({ type: "did not found id to delete", message: "did not find" });
        const deleted = await Product.findByIdAndDelete(id);
        res.json(deleted);
    } catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}

 const updateProduct = async (req, res) => {
    try {
        let {id} = req.params;
        if (!mongoose.isValidObjectId(id))
            return res.status(404).send("the id is not a valid format");
        // Validate request body using Joi
        let validate = productValidator(req.body);
        if (validate.error)
            return res.status(400).json({ type: "not valid", message: validate.error.details[0].message });
        let prodToUpdate = await Product.findByIdAndUpdate(id, req.body ,{new:true});
        if (!prodToUpdate)
             return res.status(404).send("we didn't find a car with such id to update");
        return res.status(200).json(prodToUpdate);
    } catch (err) {
        res.status(400).json(err.message);
    }
}
export {addProduct,getAllProducts,getProductById,deleteProductById,updateProduct}
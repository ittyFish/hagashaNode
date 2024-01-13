import mongoose from "mongoose";
import { Course } from "../Models/course.js";

const getAllCourses=async (req,res)=>{
    let {search} =req.query;
    let perPage=req.query.perPage||40;
    let page = req.query.page || 1;

    let ex1= new RegExp(`${search}`)

    try{
        let filter={};
        if(search)//;
        filter.name=ex1;

        let allCourses =await Course.find(filter)
        .skip(page*(perPage-1))
        .limit(perPage)

        res.json(allCourses)
    }
    catch(err){
        res.status(400).json({type:"error",message:err.message})
    }
}

const getCourseById = async (req,res) =>{
    try{
       let { id }=req.params;
       if(!mongoose.isValidObjectId(id))
         return  res.status(400).json({type:"id error",message:"id is not valid"})
      const course = await Course.findById(id);
      if(!course)
       return  res.status(400).json({type:"id not find error",message:"id is not find"})

        res.json(course)
    }
    catch(err){
        res.status(400).json({type:"error",message:err.message})
    }
}

const addCourse = async (req,res) => {
    try{
        let {name,price,tags,numLessons,speaker}=req.body;
        if(!name||!price)
        return  res.status(400).json({type:"miisied perams",message:"name or price --!push it"})


        let sameCourse=await Course.findOne({name,price});
        if(sameCourse)
          return  res.status(400).json({type:"same course",message:"same details"})

        let newCorse = await Course.create({name,numLessons,price,tags,speaker})
        res.json(newCorse)
    }
    catch(err){
        res.status(400).json({type:"error",message:err.message})
    }
}

export {addCourse,getAllCourses,getCourseById}
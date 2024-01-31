import { generateToken } from "../Config/generateToken.js";
import { userValidatorForLogin,userValidaror,User} from "../Models/users.js";
import { hash,compare  } from "bcrypt";

export const addUser = async (req,res) =>{
    
    try{
      let validate = userValidaror(req.body);
      if(validate.error)
          return  res.status(400).json
        ({type:"not valid body",message:validate.error.details[0].message})
    let { userName,password,email,role,enterDate}=req.body;
        let sameUser = await User.findOne({userName:userName})
        if (sameUser)
            return  res.status(400).json({type:"same user",message:"user already exist"})
        let hashedPassword= await hash(password,15);
        let newUser=await User.create({userName,password:hashedPassword,email,role,enterDate});
        res.json({userName:userName,email:email,role:role,enterDate:enterDate});
    
       
       
    } 
    catch (err){
        res.status(400).json({type:" error",message:err.message})
    } 
  
}

export const login = async (req,res)=>{
    let validate = userValidatorForLogin(req.body);
    if(validate.error)
        return  res.status(400).json
        ({type:"not valid body",message:validate.error.details[0].message})
  try{
    let user = await User.findOne({userName:req.body.userName})
    if(!user || ! await compare(req.body.password,user.password))
    res.status(400).json({type:"no such user",message:"sign up.."})

    let token = generateToken(user);
    return res.json({token})
  }
  catch (err){
    res.status(400).json({type:"error",message:err.message})
  }
}

export const getAllUsers= async (req,res)=>{
    try{
        const allUsers= await User.find({},"-password")
        res.json(allUsers)
    }
    catch (err){
        res.status(400).json({type:"error",message:err.message})
      }
}
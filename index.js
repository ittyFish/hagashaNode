import { config } from "dotenv";
import  express  from "express";


import { connectToDB } from "./Config/dbConfig.js";
import courseRoter from "./Roures/course.js";
import { errorHandling } from "./Middlewares/errorHandlineMw.js";
import cors from "cors"
import userRouter from "./Roures/user.js"

config();
connectToDB();

const app= express();
app.use(express.json())
app.use(cors({origin:"http://127.0.0.1:5400",methods:"*"}));


app.use("/api/courses",courseRoter)
app.use("/api/users",userRouter)


app.use(errorHandling)


let port=process.env.PORT||3500
app.listen(port,()=>{console.log(`app is listening on port ${port}`);})


import { config } from "dotenv";
import  express  from "express";


import { connectToDB } from "./Config/dbConfig.js";
import productRouter from "./Roures/product.js";
import { errorHandling } from "./Middlewares/errorHandlineMw.js";
import cors from "cors";
import userRouter from "./Roures/user.js";
import orderRouter from "./Roures/order.js";


config();
connectToDB();

const app= express();
app.use(express.json())
app.use(cors({origin:'http://localhost:3000',methods:"*"}));


app.use("/api/products",productRouter);
app.use("/api/orders",orderRouter);
app.use("/api/users",userRouter);


app.use(errorHandling)


let port=process.env.PORT||3500
app.listen(port,()=>{console.log(`app is listening on port ${port}`);})


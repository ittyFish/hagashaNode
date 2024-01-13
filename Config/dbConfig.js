import mongoose from "mongoose"

export const connectToDB = async ()=>{
    try{
        let con=await mongoose.connect(process.env.DB_CONNECTION||"mongodb://localhost:27017")
        console.log("mondoDB connected succsefuly!!",con.connection.host);
    }
    catch (err){
            console.log(" not connect to DB");
            console.log(err);
            process.exit(1);
    }
}
export const errorHandling=(err,req,res,next)=>{
    
    let statusCode=res.statusCode ||500;
    let message = err.message||"מצטערים - יש שגיאה בשרת";
    res.status(statusCode).send(message);

}

const jwt =require('jsonwebtoken');
require('dotenv').config();



module.exports.verifyToken=(req,res,next)=>{
const token =req.header("authToken");

if(!token) res.status(400).send("access denied please login")  
try{
const verified=jwt.verify(token,process.env.SECRET);    
if(verified){
next();
}else res.status(400).send(`invalid token`);
}catch(error){
    res.status(400).send(`invalid token`);
}
}

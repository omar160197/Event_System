const mongoose=require('mongoose');
const autoIncrement=require('mongoose-sequence')(mongoose);
//1-build schema with validation 

const studentSchema=new mongoose.Schema({
_id:Number,
fullName:{type:String,required:true},
email:{
    type:String,
    match:[
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        "Please enter a valid email",
      ],
},
password:{type:String, required: true}
});

studentSchema.plugin(autoIncrement,{
id:"student count",
inc_field:"_id"
});
//2-register schema in mongoose 
const Students =mongoose.model("Students",studentSchema);
module.exports=Students;

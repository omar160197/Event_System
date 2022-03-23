const mongoose = require("mongoose");

//1-build schema with validation
const speakerSchema = new mongoose.Schema({
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      "Please enter a valid email",
    ],
  },
  password: {type:String, required: true },
  fullName: {type:String, required: true },
  role: {type:String, enum: ["Student", "Instructor"], required: true },
  address: {
    type:String,  
    required: true,
  },
});



//2-register for schema in mongoos
const Speakers=mongoose.model("Speakers", speakerSchema);
module.exports = Speakers;



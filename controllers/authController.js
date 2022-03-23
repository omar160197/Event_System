const Speakers = require("../models/speakerSchema");
const { creator } = require("./registerController");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const Students = require("../models/studentRegisterSchema");
require("dotenv").config();

// module.exports.loginController = async (req, res) => {
//   const { email, password, role } = req.body;
//   if (role == "speaker") {
//     try {
//       const speaker = await Speakers.findOne({ email });
//       if (!speaker) res.status(400).send(`speaker${email} not found`);
//       else {
//         const validPassword = await bcrypt.compare(password, speaker.password);
//         if (validPassword) {
//           const token = jwt.sign({email:req.body.email}
//             , process.env.SECRET);  
//           res.status(200).json({ login: "success", token: token });
//         } else res.status(400).send(`your password is incorrect`);
//       }
//     } catch (error) {
//       res.status(400).send(`login error:${error}`);
//     }
//   } else if (role == "student") {
//     try {
//       const student = await Students.findOne({ email });
//       if (!student) res.status(400).send(`student${email} is incorrect`);
//       else {
//         const validPassword = await bcrypt.compare(password, student.password);
//         if (validPassword) {
//           const token = jwt.sign(
//             {email:req.body.email},
//            process.env.SECRET);
//           res.status(200).json({ login: "success", token: token });
//         } else res.status(400).send(`your password is incorrect`);
//       }
//     } catch (error) {
//       res.status(400).send(`login error:${error}`);
//     }
//   } else res.status(400).send("incorrect role");
// };

module.exports.registerController = (req, res) => {
  creator(req, res);
};


module.exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  const speaker = await Speakers.findOne({ email });
  const student = await Students.findOne({ email });
  if (speaker) {
    try {
        const validPassword = await bcrypt.compare(password, speaker.password);
        if (validPassword) {
          const token = jwt.sign({email:req.body.email}
            , process.env.SECRET);  
          res.status(200).json({ login: "success", token: token });
        } else res.status(400).send(`your password is incorrect`);
      
    } catch (error) {
      res.status(400).send(`login error:${error}`);
    }
  } else if(student) {
      try {
        const validPassword = await bcrypt.compare(password, student.password);
        if (validPassword) {
          const token = jwt.sign(
            {email:req.body.email},
           process.env.SECRET);
          res.status(200).json({ login: "success", token: token });
        } else res.status(400).send(`your password is incorrect`);
      
    } catch (error) {
      res.status(400).send(`login error:${error}`);
    } 
   }else res.status(400).send(`this user ${email} is not found`);
};













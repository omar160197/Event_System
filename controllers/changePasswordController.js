const Speakers = require("../models/speakerSchema");
const bcrypt = require("bcrypt");
const Students = require("../models/studentRegisterSchema");

module.exports.changePasswordController = async (req, res) => {
  const { oldPassword, newPassword, role, email } = req.body;
  if (role == "speaker") {
    try {
      const speaker = await Speakers.findOne({ email });
      const validPassword = await bcrypt.compare(oldPassword, speaker.password);
      if (validPassword) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);
        const password = hashedPassword;
        await Speakers.updateOne(
          { email: email },
          {
            $set: {
              password: password,
            },
          }
        );
        res.status(200).send("updated success")
      }else res.status(400).send(`inValid old password`);
    } catch (error) {
      res.status(400).send(`cannot change password`);
    }//change pasword for speaker

  }else if(role=="student"){
    try{
     const student =await Students.findOne({email});
     const validPassword=await bcrypt.compare(oldPassword, student.password);
     if(!validPassword) res.status(400).send(`oldPassword is incorrect`);
     const salt=bcrypt.genSaltSync(10);
     const hashedPassword=bcrypt.hashSync(newPassword,salt);
     const password=hashedPassword;
     await Students.updateOne(
      {email:email},
      {
        $set:{password:password}
      });
      res.status(200).send("updated success");
    }catch(error){
      res.status(400).send(`connot change password :${error}`);
    }
  }else res.status(400).send("incorrect role")//change password for student

};

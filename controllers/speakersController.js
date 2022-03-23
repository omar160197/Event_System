const Speakers = require("../models/speakerSchema");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

module.exports = {
  getAllOrOne: async (req, res) => {
    const { email } = req.params; 
    if (!email) {
      try {
        const allSpeakers = await Speakers.find();
        res.status(200).json(allSpeakers);
      } catch (error) {
        res.status(400).send(`cannot get all speakers:${error}`);
      }
    } else {
      try {
        const speaker = await Speakers.findOne({ email });
        if (speaker) {
          res.status(200).json(speaker);
        } else res.status(400).json({ speaker: "not Found" });
      } catch (error) {
        res.status(400).send(`cannot get speaker `);
      }
    }
  }, //get all or one speaker

  postSpeakers: async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = new Error("yes");
      error.status = 422;
      throw error;
    } else {
      try {
        let { email, password, fullName, role, address } = req.body;
        const emailExist = await Speakers.findOne({ email });
        if (!emailExist) {
          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(password, salt);
          password = hashedPassword;
          const speaker = new Speakers({
            email,
            password,
            fullName,
            role,
            address,
          });
          await speaker.save();
          res.status(200).json(speaker);
        } else res.status(400).send("email is already existed");
      } catch (error) {
        res.status(400).send(`speaker cannot be created :${error}`);
      }
    }
  }, //add speaker

  putSpeakers: async (req, res) => {
    const { email } = req.params;
    if (!email) {
      res.status(400).send(`email is required`);
    }
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = new Error();
      error.status = 422;
      throw error;
    } else {
      try {
        const speaker = await Speakers.findOne({ email });
        const { fullName,address,role } = req.body;
        if (!speaker) {
          res.status(400).send(`invalid email`);
        }
        await Speakers.updateOne(
          { email: email },
          {
            $set: {
              fullName: fullName,
              address:address,
              role:role
            },
          }
        );
        const updatedSpeaker = await Speakers.findOne({ email });
        res.status(200).json(updatedSpeaker);
      } catch (error) {
        res.status(400).send(`speaker not found:${error}`);
      }
    }
  }, //update

  deleteSpeakers: async (req, res) => {
    const { email } = req.params;
    if (!email) {
      res.status(400).send("invalid email");
    }

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = new Error();
      error.status = 422;
      throw error;
    } else {
      try {
        const speaker = await Speakers.findOne({ email });
        if (!speaker) res.status(400).send(`connot find speaker`);
        await Speakers.deleteOne({ email: email });
        // res.status(200).send(`user ${email} is deleted`);
        res.status(200).json({email:email});
      } catch (error) {
        res.status(400).send(`cannot delete user ${email} : ${error} `);
      }
    }
  }, //delete
};




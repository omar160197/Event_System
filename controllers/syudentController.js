const bcrypt = require("bcrypt");
const Students = require("../models/studentRegisterSchema");

module.exports = {
  getAllOrOne: async (req, res) => {
    const { email } = req.params;
    if (!email) {
      try {
        
        const allStudents = await Students.find();
        res.status(200).json(allStudents);
      } catch (error) {
        res.status(400).send(`cannot get all students:${error}`);
      }
    } else {
      try {
        const student = await Students.findOne({ email });
        if (student) {
          res.status(200).json(student);
        } else res.status(400).json({ student: "not Found" });
      } catch (error) {
        res.status(400).send(`cannot get student `);
      }
    }
  }, //get all or one student

  addStudent: async (req, res) => {
    try {
      let { fullName, email, password } = req.body;

      const studentExisted = await Students.findOne({ email });
      if (!studentExisted) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        password = hashedPassword;
        const student = new Students({ fullName, email, password });
        await student.save();
        res.status(200).send(`student ${email} added success`);
      } else res.status(400).send("student is already existed");
    } catch (error) {
      res.status(400).send(`unsuccess creations ${error}`);
    }
  }, //add new

  putStudent: async (req, res) => {
    const { email } = req.params;
    if (!email) {
      res.status(400).send(`email is required`);
    }
    try {
      const student = await Students.findOne({ email });
      const { fullName } = req.body;
      if (!student) {
        res.status(400).send(`invalid email`);
      }
      await Students.updateOne(
        { email: email },
        {
          $set: {
            fullName: fullName,
          },
        }
      );
      const updatedStudent = await Students.findOne({ email });
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.status(400).send(`student not found:${error}`);
    }
  }, //update

  deleteStudent: async (req, res) => {
    const { email } = req.params;
    if (!email) {
      res.status(400).send("email is requird");
    }
    try {
      const student = await Students.findOne({ email });
      if (!student) res.status(400).send(`connot find atudent`);
      await Students.deleteOne({ email: email });
      res.status(200).send(`user ${email} is deleted`);
    } catch (error) {
      res.status(400).send(`cannot delete user ${email} : ${error} `);
    }
  }, //delete
};

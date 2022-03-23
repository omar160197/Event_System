const router = require("express").Router();
const {
  getAllOrOne,
  addStudent,
  putStudent,
  deleteStudent,
} = require("../controllers/syudentController");


router
  .route("/students/:email?")
  .get(getAllOrOne)
  .post(addStudent)
  .put(putStudent)
  .delete(deleteStudent);
  
module.exports = router;



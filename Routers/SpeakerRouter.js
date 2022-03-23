const router = require("express").Router();
const {
  validatePostData,
  validatePutData,
  validateDeleteData,
} = require("../services/speakerService");

const {
  getAllOrOne,
  postSpeakers,
  putSpeakers,
  deleteSpeakers,
} = require("../controllers/speakersController");



router
  .route("/speakers/:email?")
  .get(getAllOrOne)
  .post(validatePostData(),postSpeakers)
  .put(validatePutData(),putSpeakers)
  .delete(deleteSpeakers);
  
module.exports = router;




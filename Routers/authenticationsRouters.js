const router = require("express").Router();
const {
  changePasswordController,
} = require("../controllers/changePasswordController");

const {
  loginController,
  registerController,
} = require("../controllers/authController");

//endPoints
router.route("/login").post(loginController);

router.route("/register").post(registerController);

router.route("/changePassword").put(changePasswordController);

module.exports = router;

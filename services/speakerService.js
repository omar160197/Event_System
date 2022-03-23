const { body } = require("express-validator");

module.exports.validatePostData = () => {
  return [
    body("fullName")
      .isString()
      .withMessage("name is required and must be alpha"),
    body("password")
      .isAlphanumeric()
      .isLength({ min: 8 })
      .withMessage("password min length: 8 "),
    body("email").isEmail().withMessage("please enter valid email"),
    body("address").isString().withMessage("send address as an object"),
    body("role").isString().withMessage("select your role")
  ];
};

module.exports.validatePutData = () => {
  return [
    body("fullname")
      .isString()
      .withMessage("name is required and must be alpha"),
    body("password")
      .isAlphanumeric()
      .isLength({ min: 8 })
      .withMessage("password min length: 8 "),
    body("email").isEmail().withMessage("email must be a valid"),
    body("address").isObject().withMessage("address must be an object"),
    body("image").isString().withMessage("image must be string"),
  ];
};

module.exports.validateDeleteData = () => {
  return body("id").isAlphanumeric().withMessage("id is not a number");
};
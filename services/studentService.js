const { body } = require("express-validator");


module.exports.validatePostData = () => {
  return [
    body("fullname")
      .isString()
      .withMessage("name is required and must be string"),
    body("password")
      .isAlphanumeric()
      .isLength({ min: 8 })
      .withMessage("password min length: 8 "),
    body("email")
      .isEmail()
      .withMessage("please enter valid email"),
  ];
};

module.exports.validatePutData = () => {
  return [
    body("_id").isNumeric().withMessage("id must be a number"),
    body("newData.fullname")
      .isString()
      .withMessage("name is required and must be string"),
    body("newData.password")
      .isAlphanumeric()
      .isLength({ min: 8 })
      .withMessage("password min length: 8 "),
    body("newData.email")
      .isEmail()
      .withMessage("email must be a valid"),
  ];
};

module.exports.validateDeleteData = () => {
  return body("_id").isNumeric().withMessage("id is not a number");
};
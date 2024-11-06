import { body } from "express-validator";
const userValidations = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 and 20 characters"),
  body("username")
    .optional()
    .isLength({ min: 3, max: 10 })
    .withMessage("Username must be between 3 and 10 characters"),
  body("gender")
    .isIn(["male", "female"])
    .withMessage("Invalid gender")
    .optional(),
];

export default userValidations;

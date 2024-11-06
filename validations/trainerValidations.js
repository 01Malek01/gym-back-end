import { body } from "express-validator";
const trainerValidations = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 and 20 characters"),
  body("name")
    .optional()
    .isLength({ min: 3, max: 10 })
    .withMessage("Name must be between 3 and 10 characters"),
  body("gender").isIn(["male", "female"]).withMessage("Invalid gender"),
  body("phoneNumber").isMobilePhone().withMessage("Invalid phone number"),
  body("experience").isNumeric().withMessage("Experience must be a number"),
  body("specialization")
    .isLength({ min: 3, max: 20 })
    .withMessage("Specialization must be between 3 and 20 characters"),
];

export default trainerValidations;

import { body } from "express-validator";
const membershipValidations = [
  body("type").isString().withMessage("Invalid type"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("durationInDays")
    .isNumeric()
    .withMessage("Duration in days must be a number"),
];

export default membershipValidations;

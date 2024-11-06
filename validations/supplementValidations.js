import { body } from "express-validator";
const supplementValidations = [
  body("name")
    .isString()
    .isLength({ min: 3, max: 20 })
    .withMessage("Invalid name"),
  body("description")
    .isString()
    .isLength({ min: 5, max: 100 })
    .withMessage("Invalid description"),
  body("price").isFloat().withMessage("Invalid price"),
  body("stock").isNumeric().withMessage("Invalid stock"),
];

export default supplementValidations;

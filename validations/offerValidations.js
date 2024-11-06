import { body } from "express-validator";
import AppError from "../utils/AppError.js";

const offerValidations = [
  body("title")
    .isString()
    .isLength({ min: 3, max: 20 })
    .withMessage("Invalid title"),
  body("description")
    .isString()
    .isLength({ min: 5, max: 100 })
    .withMessage("Invalid description"),
  body("startDate")
    .isISO8601()
    .withMessage("Invalid start date")
    .isAfter(new Date().toISOString())
    .withMessage("Start date must be after today"),
  body("endDate")
    .isISO8601()
    .withMessage("Invalid end date")
    .custom((value, { req }) => {
      const startDate = new Date(req.body.startDate);
      const endDate = new Date(value);
      if (endDate <= startDate) {
        throw new AppError("End date must be after start date");
      }
      return true;
    }),
];

export default offerValidations;

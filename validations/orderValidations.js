//order validations
import { body } from "express-validator";

const orderValidations = [
  // body("paymentMethod").isString().withMessage("Invalid payment method"),
  // body("paymentStatus")
  //   .isIn(["pending", "success", "failed"])
  //   .withMessage("Invalid payment status"),
  body("totalPrice").isNumeric().withMessage("Total price must be a number"),
  body("orderItems").isArray().withMessage("Order items must be an array"),
  body("orderItems.*.itemType")
    .isString()
    .isIn(["supplement", "membership"])
    .withMessage("Item type must be a string"),
  body("orderItems.*.quantity")
    .isFloat()
    .withMessage("Quantity must be a number"),
];

export default orderValidations;

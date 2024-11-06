import expressAsyncHandler from "express-async-handler";
import axios from "axios";
import AppError from "../utils/AppError.js";
import Order from "../models/Order.js";

export const payOrder = expressAsyncHandler(async (req, res, next) => {
  //extract merchant code and id and other data
  const {
    FAWRY_MERCHANT_CODE,
    FAWRY_SECURE_KEY,
    FAWRY_BASE_URL,
    FAWRY_DEBIT_MOBILE,
  } = process.env;
  const { totalPrice, orderItems, itemDescription } = req.body;
  const user = req.user;
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const newOrder = await Order.create({
    user: user._id,
    orderItems: orderItems,
    totalPrice: totalPrice,
    paymentMethod: "MWALLET",
    paymentStatus: "pending",
  });
  //fawry payment data (body)
  const paymentData = {
    amount: newOrder.totalPrice,
    chargeItems: newOrder.orderItems.map((item) => {
      return {
        name: item.itemType,
        price: item.itemPrice,
        quantity: item.quantity,
        description: itemDescription,
      };
    }),
    currencyCode: "EGP",
    customerEmail: user.email,
    customerMobile: user.phoneNumber,
    description: `order - ${newOrder._id}`,
    language: "en-gb",
    merchantCode: FAWRY_MERCHANT_CODE,
    merchantRefNum: newOrder._id,
    paymentMethod: "MWALLET",
    debitMobileWalletNo: FAWRY_DEBIT_MOBILE,
    signature:
      FAWRY_SECURE_KEY + ":" + FAWRY_MERCHANT_CODE + ":" + newOrder._id,
  };

  try {
    const response = await axios.post(
      FAWRY_BASE_URL ||
        "https://atfawry.fawrystaging.com/ECommerceWeb/api/payments/charge",
      {
        paymentData,
      }
    );

    console.log("payment response", response);
    res.status(200).json({
      status: response.data.status,
      message: "success",
      fawryReferenceNumber: response.data.fawryReferenceNumber,
    });

    //edit the order
    newOrder.paymentStatus = "success";
    newOrder.fawryReferenceNumber = response.data.fawryReferenceNumber;
    await newOrder.save();
  } catch (err) {
    res.status(500);
    throw new AppError(err, 500);
  }
});

export const getAllOrders = expressAsyncHandler(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json({
    status: "success",
    orders,
  });
});

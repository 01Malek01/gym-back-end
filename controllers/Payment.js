import asyncHandler from "express-async-handler";
import Membership from "../models/Membership.js";
import axios from "axios";
import Order from "../models/Order.js";
import User from "../models/User.js";

const FAWATERAK_API_URL =
  "https://staging.fawaterk.com/api/v2/createInvoiceLink";

export const buyMembership = asyncHandler(async (req, res, next) => {
  const { email, username } = req.user;

  const membership = await Membership.findById(req.params.membershipId);
  if (!membership) {
    res.status(404);
    throw new Error("Membership not found");
  }

  if (req.user.membershipStatus === "active") {
    res.status(400).json({ error: "You are already a member" });
    throw new Error("You are already a member");
  }
  try {
    const fawaterkResponse = await axios.post(
      FAWATERAK_API_URL,
      {
        cartItems: [
          {
            name: `Membership type : ${membership.type}`,
            price: membership.price.toString(),
            quantity: "1",
          },
        ],
        cartTotal: membership.price,
        currency: "EGP",
        customer: {
          first_name: username,
          last_name: "gym",
          email,
          phone: "",
          address: "",
        },
        sendEmail: true,
        sendSMS: false,
        redirect: "follow",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FAWATERAK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    //suppose the payment was successful and the user is now a member (this is just temporary until we create a real fawaterak account and then we use the webhook to update the user's membership status)
    const existingUser = await User.findByIdAndUpdate(req.user._id, {
      membershipStatus: "active",
      membershipType: membership._id,
      membershipExpirationDate: new Date(
        Date.now() + membership.durationInDays * 24 * 60 * 60 * 1000 //convert days to milliseconds
      ),
    });
    if (!existingUser) {
      res.status(404);
      throw new Error("User not found");
    }

    //now save the order to the database
    const newOrder = new Order({
      user: req.user._id,
      orderItems: [
        {
          itemType: "membership",
          itemPrice: membership.price,
          itemDescription: `Membership type : ${membership.type}`,
        },
      ],
      totalPrice: membership.price,
      paymentMethod: "fawaterak",
      paymentStatus: "success",
    });
    await newOrder.save();

    //send the payment checkout url to the front-end
    res.json({ checkout_url: fawaterkResponse?.data?.data?.url });
  } catch (err) {
    console.error(err);
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

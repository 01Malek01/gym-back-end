import asyncHandler from "express-async-handler";
import Membership from "../models/Membership.js";
import axios from "axios";

const FAWATERAK_API_URL =
  "https://staging.fawaterk.com/api/v2/createInvoiceLink";

export const buyMembership = asyncHandler(async (req, res, next) => {
  const { email, username } = req.user;

  const membership = await Membership.findById(req.params.membershipId);
  if (!membership) {
    res.status(404);
    throw new Error("Membership not found");
  }

  try {
    const fawaterkResponse = await axios.post(
      FAWATERAK_API_URL,
      {
        cartItems: [
          {
            name: membership.type,
            price: membership.price.toString(), // Ensure price is a string
            quantity: "1",
          },
        ],
        cartTotal: membership.price,
        currency: "EGP",
        customer: {
          first_name: username,
          last_name: "gym", // Add if needed
          email,
          phone: "", // Modify with real data
          address: "", // Modify with real data
        },
        sendEmail: true,
        sendSMS: false,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FAWATERAK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(fawaterkResponse.data.data.url);
    res.json({ checkout_url: fawaterkResponse.data.data.url });
  } catch (err) {
    console.error("Fawaterk API Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

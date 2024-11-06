import express from "express";
import cors from "cors";
import xss from "xss-clean";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import globalErrorHandler from "./middlewares/Error.js";
import userRoutes from "./routes/User.js";
import trainerRoutes from "./routes/Trainer.js";
import membershipRoutes from "./routes/Membership.js";
import orderRoutes from "./routes/Order.js";
import supplementRoutes from "./routes/Supplement.js";
import offerRoutes from "./routes/Offer.js";
const app = express();
dotenv.config({ path: "./.env" });
//security middlewares
app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
  })
);

app.use(
  xss({ whiteList: ["http://localhost:5137", `${process.env.FRONTEND}`] })
);

//dev middlewares
app.use(morgan("dev"));

//cookie
app.use(cookieParser());
//other middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/test", (req, res) => {
  res.send("test success!");
});

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/trainer", trainerRoutes);
app.use("/api/v1/membership", membershipRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/supplement", supplementRoutes);
app.use("/api/v1/offer", offerRoutes);

//global error handler
app.use(globalErrorHandler);

export default app;

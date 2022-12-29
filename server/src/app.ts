import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

// Routes
import CustomerRoute from "../routes/Customer";
import VendorRoute from "../routes/Vendor";
import S3Route from "../routes/S3";
import OrderRouter from "../routes/Orders";

app.use("/api/customer", CustomerRoute);
app.use("/api/vendor", VendorRoute);
app.use("/api/aws", S3Route);
app.use("/api/orders", OrderRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.mongoConnect as string);
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }
};

app.listen(5000, () => {
  start();
  console.log("Server up and running too !");
});

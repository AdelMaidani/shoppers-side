import { Request, Response } from "express";
import Customer from "../../models/Customer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const CustomerLogin = async (req: Request, res: Response) => {
  const customer = await Customer.findOne({
    email: req.body.email.toLowerCase(),
  });
  if (!customer) return res.status(200).send("Email or password wrong");

  const password = await bcrypt.compare(req.body.password, customer.password);
  if (!password) return res.status(200).send("Email or password wrong");

  const token = jwt.sign(
    { id: customer._id, UserType: "Customer" },
    process.env.jwtSecret as string
  );
  res.cookie("SS", token, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    path: "/",
  });
  res.send("logged in");
};

export default CustomerLogin;

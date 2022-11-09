import { Request, Response } from "express";
import Customer from "../../models/Customer";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const RegisterCustomer = async (req: Request, res: Response) => {
  const emailExist = await Customer.findOne({ email: req.body.email });
  if (emailExist) return res.status(200).send("Email already exist");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email.toLowerCase(),
    password: hashedPassword,
  });

  const RegisteredCustomer = await customer.save();
  const token = JWT.sign(
    { id: RegisteredCustomer._id, UserType: "Customer" },
    process.env.jwtSecret as string
  );
  res
    .cookie("SS", token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      path: "/",
    })
    .sendStatus(200);
};

export default RegisterCustomer;

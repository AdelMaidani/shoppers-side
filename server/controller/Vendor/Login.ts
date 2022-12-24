import Vendor from "../../models/Vendor";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const CreateVendor = async (req: Request, res: Response) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const create = new Vendor({
    email: req.body.email.toLowerCase(),
    password: hashedPassword,
  });

  const Save = await create.save();
  res.send(Save);
};

const VendorLogin = async (req: Request, res: Response) => {
  const vendor = await Vendor.findOne({
    email: req.body.email.toLowerCase(),
  });
  if (!vendor) return res.status(200).send("Email or password wrong");

  const password = await bcrypt.compare(req.body.password, vendor.password);
  if (!password) return res.status(200).send(" password wrong");

  const token = jwt.sign(
    { id: vendor._id, UserType: "Vendor" },
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

const VendorLogout = (req: Request, res: Response) => {
  res.clearCookie("SS").sendStatus(200);
};

export { VendorLogin, CreateVendor, VendorLogout };

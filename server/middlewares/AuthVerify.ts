import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  UserType: string;
}

const AuthVerify = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.SS;

  if (!token) {
    res.send({ Authorization: "false" });
  } else {
    try {
      let User = jwt.verify(
        token,
        process.env.jwtSecret as string
      ) as JwtPayload;

      const UserId = User.id;

      if (User.UserType === "Customer") {
        res.locals = { Authorization: true, UserId, UserType: "Customer" };
      } else {
        res.locals = { Authorization: true, UserId, UserType: "Vendor" };
      }

      next();
    } catch (error) {
      res.send({ Authorization: "false" });
      res.redirect("/");
    }
  }
};

export default AuthVerify;

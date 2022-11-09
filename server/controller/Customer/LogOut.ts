import { Request, Response } from "express";

const LogoutCustomer = (req: Request, res: Response) => {
  res.clearCookie("SS").sendStatus(200);
};

export default LogoutCustomer;

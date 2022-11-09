import { Router } from "express";
import AuthCheck from "../controller/Customer/AuthCheck";
import CustomerData from "../controller/Customer/CustomerData";
import CustomerLogin from "../controller/Customer/Login";
import LogoutCustomer from "../controller/Customer/LogOut";
import RegisterCustomer from "../controller/Customer/Register";
import AuthVerify from "../middlewares/AuthVerify";
import { getProductById } from "../controller/Vendor/GetProducts";

const CustomerRoute = Router();

CustomerRoute.post("/registerCustomer", RegisterCustomer);
CustomerRoute.post("/loginCustomer", CustomerLogin);
CustomerRoute.get("/verify", AuthVerify, AuthCheck);
CustomerRoute.post("/data", AuthVerify, CustomerData);
CustomerRoute.get("/logout", AuthVerify, LogoutCustomer);
CustomerRoute.post("/publicGetProduct", getProductById);

export default CustomerRoute;

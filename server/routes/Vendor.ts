import { Router } from "express";
import CreateProduct from "../controller/Vendor/CreateProduct";
import {
  getProduct,
  getProductById,
  getProductByIds,
} from "../controller/Vendor/GetProducts";
import {
  CreateVendor,
  VendorLogin,
  VendorLogout,
} from "../controller/Vendor/Login";
import AuthVerify from "../middlewares/AuthVerify";

const VendorRoute = Router();

VendorRoute.post("/createVendor", CreateVendor);
VendorRoute.post("/loginVendor", VendorLogin);
VendorRoute.post("/createProduct", AuthVerify, CreateProduct);
VendorRoute.get("/getProduct", getProduct);
VendorRoute.post("/getProductById", AuthVerify, getProductById);
VendorRoute.post("/getProductByIds", getProductByIds);
VendorRoute.get("/logout", VendorLogout);

export default VendorRoute;

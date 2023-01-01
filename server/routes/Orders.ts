import { Router } from "express";
import {
  GetOrders,
  GetCustomOrder,
  GetMuiltipleOrder,
} from "../controller/Orders/GetOrders";
import {
  changeStatus,
  changeTrackingNumber,
} from "../controller/Orders/ChangeStatus";
import Authentify from "../middlewares/AuthVerify";

import PlaceOrder from "../controller/Orders/PlaceOrder";

const OrderRouter = Router();

OrderRouter.post("/placeOrder", PlaceOrder);
OrderRouter.get("/getOrders", GetOrders);
OrderRouter.post("/getCustomOrder", Authentify, GetCustomOrder);
OrderRouter.post("/getMuiltipleOrder", Authentify, GetMuiltipleOrder);
OrderRouter.post("/changeOrderStatus", Authentify, changeStatus);
OrderRouter.post("/changeTrackingNumber", Authentify, changeTrackingNumber);

export default OrderRouter;

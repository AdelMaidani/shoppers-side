import { Router } from "express";
import GetOrders from "../controller/Orders/GetOrders";

import PlaceOrder from "../controller/Orders/PlaceOrder";

const OrderRouter = Router();

OrderRouter.post("/placeOrder", PlaceOrder);
OrderRouter.get("/getOrders", GetOrders);

export default OrderRouter;

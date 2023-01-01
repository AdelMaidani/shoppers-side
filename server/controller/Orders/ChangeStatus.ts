import { Request, Response } from "express";
import Orders from "../../models/Orders";

const changeStatus = (req: Request, res: Response) => {
  const { id, status } = req.body;

  Orders.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        status: status,
      },
    }
  )
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

const changeTrackingNumber = (req: Request, res: Response) => {
  const { id, trackingNumber } = req.body;

  Orders.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        trackingNumber: trackingNumber,
      },
    }
  )
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

export { changeStatus, changeTrackingNumber };

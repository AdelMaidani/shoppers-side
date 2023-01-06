import { Request, Response } from "express";
import ComplaintTicket from "../../models/ComplaintTicket";

const raiseTicket = (req: Request, res: Response) => {
  const { complaintTitle, orderId, userId, description } = req.body;

  const raiseTicket = new ComplaintTicket({
    complaintTitle,
    orderId,
    userId,
    description,
  });

  const save = raiseTicket.save();

  res.send(save);
};

const getTicketByUserId = (req: Request, res: Response) => {
  ComplaintTicket.find({
    userId: { $in: req.body.id },
  })
    .then((resp) => res.send(resp))
    .catch((err) => res.send(err));
};

export { raiseTicket, getTicketByUserId };

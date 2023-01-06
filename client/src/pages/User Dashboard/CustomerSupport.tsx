import axios from "axios";
import { useEffect, useState } from "react";
import UserNav from "../../components/UserNav";
import { useUser } from "../../contexts/UserContext";
import * as Yup from "yup";
import { useFormik } from "formik";

type order = {
  product: {
    id: string;
    sizes: { size: String; q: Number }[];
  }[];
  userId: string;
  date: string;
  totalValue: number;
  status: string;
  country: string;
  city: string;
  street1: string;
  street2: string;
  pincode: string;
  shippingMethod: string;
  cardNumber: string;
  nameOnCard: string;
  countryOnCard: string;
  trackingNumber: string;
  _id: string;
}[];

type ticket = {
  complaintTitle: string;
  orderId: string;
  description: string;
  userId: string;
}[];

function CustomerSupport() {
  const { customerData } = useUser();
  const [orders, setOrders] = useState<order>();
  const [tickets, setTickets] = useState<ticket>();

  useEffect(() => {
    if (customerData?._id !== undefined) {
      axios({
        method: "Post",
        headers: { "Content-Type": "application/json" },
        url: "http://localhost:5000/api/orders/userAllOrders",
        withCredentials: true,
        data: { userId: customerData?._id },
      })
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => console.log(err));

      axios({
        method: "Post",
        headers: { "Content-Type": "application/json" },
        url: "http://localhost:5000/api/orders/getTicketByUserId",
        withCredentials: true,
        data: { id: customerData?._id },
      })
        .then((res) => {
          setTickets(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [customerData?._id]);

  const formik = useFormik({
    initialValues: {
      complaintTitle: "",
      orderId: "",
      description: "",
      userId: "",
    },
    validationSchema: Yup.object({
      complaintTitle: Yup.string().required("Complaint title is required"),
      orderId: Yup.string().required("Complaint title is required"),
      description: Yup.string().required("Complaint title is required"),
      userId: Yup.string(),
    }),
    onSubmit: (values) => {
      if (customerData?._id !== undefined) {
        formik.values.userId = customerData._id.toString();
        axios({
          method: "Post",
          url: "http://localhost:5000/api/orders/raiseTicket",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          data: values,
        }).catch((err) => console.log(err));
      }
    },
  });

  return (
    <div className="p-10 bg-black flex flex-col items-left gap-10 h-screen text-white">
      <UserNav />

      {/* Raise a ticket */}
      <div className="text-lg underline underline-offset-4">Raise a ticket</div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <span className="h-10 p-2 w-40">Complaint Title :</span>
          <input
            name="complaintTitle"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-10 p-2 text-black w-72 border"
          />
        </div>
        <div className="h-1">
          {formik.touched.complaintTitle && formik.errors.complaintTitle ? (
            <p className="text-red-500 text-xs">
              {formik.errors.complaintTitle}
            </p>
          ) : null}
        </div>
        <div className="flex gap-4">
          <span className="h-10 p-2 w-40">Choose order :</span>
          <select
            name="orderId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-10 p-2 w-72 text-black border"
          >
            <option>Select order</option>
            {orders?.map((order) => (
              <option value={order._id}>
                {order._id.split("", 6)}, Rs. {order.totalValue}
              </option>
            ))}
          </select>
        </div>
        <div className="h-1">
          {formik.touched.orderId && formik.errors.orderId ? (
            <p className="text-red-500 text-xs">{formik.errors.orderId}</p>
          ) : null}
        </div>
        <div className="flex gap-4">
          <span className="h-10 p-2 w-40">Description :</span>
          <textarea
            className="h-72 p-2 w-72 text-black border"
            placeholder=""
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="h-1">
          {formik.touched.description && formik.errors.description ? (
            <p className="text-red-500 text-xs">{formik.errors.description}</p>
          ) : null}
        </div>
        <div className="flex gap-4">
          <span className="h-10 p-2 w-40"></span>
          <button
            onBlur={formik.handleBlur}
            type="submit"
            id="submit"
            name="submit"
            className="items-center flex-col h-10 p-2 w-72 text-white text-center border border-white hover:bg-white hover:text-black duration-500"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Past tickets  */}
      <div className="flex flex-col gap-4">
        <div className="text-lg underline underline-offset-4">
          Raised Tickets
        </div>
        <div>
          <div className="border border-white bg-white  text-black flex items-center justify-around gap-10 p-10 h-20">
            <span className="w-10">Id</span>
            <span className="w-20">Complaint</span>
            <span className="w-32">Description</span>
            <span className="w-32">Status</span>
          </div>
          {tickets?.map((tick) => (
            <div className="border border-gray-300 duration-500 hover:bg-gray-300 hover:text-black text-white flex items-center justify-around gap-10 p-10 h-20">
              <span className="w-10">{tick.orderId.split("", 6)}</span>
              <span className="w-20">{tick.complaintTitle}</span>
              <span className="w-32">{tick.description}</span>
              <span className="w-32">status</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerSupport;

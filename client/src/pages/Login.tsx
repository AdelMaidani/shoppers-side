import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { scrollToTop } from "../utils/ScrolToTop";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

const Login = () => {
  const { setUser } = useUser();
  useEffect(() => scrollToTop(), []);
  const [logging, setLogging] = useState<boolean>(false);
  const [incorrectCredentials, setIncorrectCredentials] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .min(5, "Please enter valid mail.")
        .max(30, "Please enter valid mail.")
        .required("e-mail Id is required to continue.")
        .email("please enter valid e-mail."),
      password: Yup.string()
        .min(5, "Please enter more charecter to continue.")
        .max(100, "Enter less charecter to continue.")
        .required("Password required to continue."),
    }),
    onSubmit: (values) => {
      setLogging(true);
      axios({
        method: "Post",
        url: "http://localhost:5000/api/customer/loginCustomer",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        data: values,
      })
        .then((res) => {
          if (res.data === "Email or password wrong") {
            setIncorrectCredentials(true);
            setLogging(false);
          } else {
            navigate("/dashboard/myorders");
            setUser("Customer");
          }
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className="bg-black text-white flex h-full flex-col items-center gap-10 p-10">
      <div className="text-xl underline underline-offset-8">Login</div>
      <div className="text-xs">Please enter your e-mail and password:</div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col text-black items-center gap-5"
      >
        <div className="flex flex-col gap-2">
          <input
            className="h-10 p-2 w-72 border"
            type="text"
            placeholder="E-mail"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
          />
          <div className="h-1">
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-xs">{formik.errors.email}</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <input
            className="h-10 p-2 w-72 border"
            type="password"
            placeholder="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
          />
          <div className="h-1">
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-xs">{formik.errors.password}</p>
            ) : null}
          </div>
        </div>
        <div
          className={` "flex items-center flex-col h-10 p-2 w-72 text-white text-center border border-white hover:text-black duration-500" ${
            logging ? "" : "hidden"
          }`}
        >
          <div
            className="inline-block w-4 h-4
          border-t-4 
          border-white  
          rounded-full 
          animate-spin"
          ></div>
        </div>
        <div className={`${incorrectCredentials ? "block h-1" : "hidden h-1"}`}>
          <p className="text-red-500 text-xs">Email or password incorrect</p>
        </div>

        <button
          onBlur={formik.handleBlur}
          type="submit"
          name="submit"
          className={` " items-center flex-col h-10 p-2 w-72 text-white text-center border border-white hover:bg-white hover:text-black duration-500" ${
            logging ? "hidden" : ""
          }`}
        >
          Log In
        </button>
      </form>
      <div>
        New customer?{" "}
        <Link to={"/signup"} className="underline">
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default Login;

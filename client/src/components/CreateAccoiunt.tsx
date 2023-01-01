import { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { scrollToTop } from "../utils/ScrolToTop";
import { useUser } from "../contexts/UserContext";

type Props = {
  switchLogin: Function;
};

function CreateAccoiunt({ switchLogin }: Props) {
  const { setUser } = useUser();
  const [emailExist, setEmailExist] = useState<boolean>(false);
  const [registering, setRegistering] = useState<boolean>(false);

  useEffect(() => scrollToTop(), []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "Please enter valid first name.")
        .max(12, "Please enter valid first name.")
        .required("First name is required to continue."),
      lastName: Yup.string()
        .min(2, "Please enter valid last name.")
        .max(12, "Please enter valid last name.")
        .required("Last name is required to continue."),
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
      setRegistering(true);
      axios({
        method: "Post",
        url: "http://localhost:5000/api/customer/registerCustomer",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        data: values,
      })
        .then((res) => {
          if (res.data === "Email already exist") {
            setEmailExist(true);
            setRegistering(false);
          } else {
            setUser("Customer");
          }
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className="bg-black text-white flex h-full flex-col items-center gap-10 p-10">
      <div className="text-xl underline underline-offset-8">Register</div>
      <div className="text-xs">Fill in the fields below:</div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col text-black items-center gap-5"
      >
        <div className="flex flex-col gap-2">
          <input
            className="h-10 p-2 w-72 border"
            type="text"
            placeholder="First name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="firstName"
          />
          <div className="h-1">
            {formik.touched.firstName && formik.errors.firstName ? (
              <p className="text-red-500 text-xs">{formik.errors.firstName}</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <input
            className="h-10 p-2 w-72 border"
            type="text"
            placeholder="Last name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="lastName"
          />
          <div className="h-1">
            {formik.touched.lastName && formik.errors.lastName ? (
              <p className="text-red-500 text-xs">{formik.errors.lastName}</p>
            ) : null}
          </div>
        </div>
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
            placeholder="Password"
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
        <div className={`${emailExist ? "block h-1" : "hidden h-1"}`}>
          <p className="text-red-500 text-xs">
            Email already exist try loging in !
          </p>
        </div>

        <div
          className={` "flex items-center flex-col h-10 p-2 w-72 text-white text-center border border-white hover:text-black duration-500" ${
            registering ? "" : "hidden"
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

        <button
          onBlur={formik.handleBlur}
          type="submit"
          name="submit"
          className={` " items-center flex-col h-10 p-2 w-72 text-white text-center border border-white hover:bg-white hover:text-black duration-500" ${
            registering ? "hidden" : ""
          }`}
        >
          CREATE ACCOUNT
        </button>
      </form>
      <div className="flex gap-1">
        Already have an account?{" "}
        <div
          onClick={() => switchLogin("login")}
          className="underline cursor-pointer"
        >
          Login
        </div>
      </div>
    </div>
  );
}

export default CreateAccoiunt;

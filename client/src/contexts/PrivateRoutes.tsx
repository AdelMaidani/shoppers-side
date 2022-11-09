import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./UserContext";

const ForCustomerOnly = () => {
  const { userType } = useUser();
  return userType === "Customer" ? <Outlet /> : <Navigate to={"/login"} />;
};

const ForVendorOnly = () => {
  const { userType } = useUser();
  return userType === "Vendor" ? <Outlet /> : <Navigate to={"/login"} />;
};

const LoggedOutUsersOnly = () => {
  const { userType } = useUser();
  return userType === "Null" ? <Outlet /> : <Navigate to={"/"} />;
};

export { ForCustomerOnly, LoggedOutUsersOnly, ForVendorOnly };

import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import Products from "./pages/Vendor Dashboard/Products";
import Webpage from "./pages/Vendor Dashboard/Webpage";
import Orders from "./pages/Vendor Dashboard/Orders";
import OrderDescription from "./pages/Vendor Dashboard/OrderDescription";
import EditProduct from "./pages/Vendor Dashboard/EditProduct";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kid from "./pages/Kid";
import Accesories from "./pages/Accesories";
import MyOrders from "./pages/User Dashboard/MyOrders";
import AddProduct from "./pages/Vendor Dashboard/AddProduct";
import Footer from "./components/Footer";
import LazyLoading from "./components/LazyLoading";
import { UserProvider } from "./contexts/UserContext";
import {
  ForCustomerOnly,
  LoggedOutUsersOnly,
  ForVendorOnly,
} from "./contexts/PrivateRoutes";
import VendorLogin from "./pages/VendorLogin";
import { CartProvider } from "./contexts/CartContext";
import Checkout from "./pages/Checkout";
import CustomerSupport from "./pages/User Dashboard/CustomerSupport";
import MyOrderDescription from "./pages/User Dashboard/OrderDescription";

const Home = React.lazy(() => import("./pages/Home"));

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <div className="min-h-screen text-sm flex flex-col">
          <Navbar />
          <Routes>
            {/* Home Page */}
            <Route
              element={
                <React.Suspense fallback={<LazyLoading />}>
                  <Home />
                </React.Suspense>
              }
              path="/"
            />
            {/* Login / Register */}
            <Route element={<LoggedOutUsersOnly />}>
              <Route element={<VendorLogin />} path="/vendorLogin" />
              <Route element={<Login />} path="/login" />
              <Route element={<SignUp />} path="/signup" />
            </Route>
            {/* Common */}
            <Route element={<Men />} path="/men" />
            <Route element={<Women />} path="/women" />
            <Route element={<Kid />} path="/kid" />
            <Route element={<Accesories />} path="/accessories" />
            <Route element={<ProductPage />} path="/product/:productId" />
            <Route element={<CategoryPage />} path="/Category/:categoryName" />
            <Route element={<Checkout />} path="/checkout" />
            {/* Customer Dashboard */}
            <Route element={<ForCustomerOnly />}>
              <Route element={<MyOrders />} path="/dashboard/myOrders" />
              <Route
                element={<CustomerSupport />}
                path="/dashboard/customerSupport"
              />
              <Route
                element={<MyOrderDescription />}
                path="/dashboard/myOrder/:id"
              />
            </Route>
            {/* Vendor */}
            <Route element={<ForVendorOnly />}>
              <Route element={<Webpage />} path="/dashboard/webpage" />
              <Route element={<Products />} path="/dashboard/products" />
              <Route element={<Orders />} path="/dashboard/orders" />
              <Route
                element={<OrderDescription />}
                path="/dashboard/order/:id"
              />
              <Route element={<EditProduct />} path="/dashboard/product/:id" />
              <Route element={<AddProduct />} path="/dashboard/addproduct" />
            </Route>
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;

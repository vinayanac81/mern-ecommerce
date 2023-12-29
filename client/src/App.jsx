import { Toaster } from "react-hot-toast";
import AdminLogin from "./Pages/Admin/AdminLogin";
import Home from "./Pages/User/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminProducts from "./Pages/Admin/AdminProducts";
import AdminUsers from "./Pages/Admin/AdminUsers";
import AddProduct from "./Pages/Admin/AddProduct";
import EditProduct from "./Pages/Admin/EditProduct";
import ViewProduct from "./Pages/Admin/ViewProduct";
import AdminCategory from "./Pages/Admin/AdminCategory";
import Brand from "./Pages/Admin/Brand";
import Login from "./Pages/User/Login";
import Signup from "./Pages/User/Signup";
import Checkout from "./Pages/User/Checkout";
import PaymentSuccess from "./Pages/User/PaymentSuccess";
import Orders from "./Pages/Admin/Orders";
import Coupen from "./Pages/Admin/Coupen";
import AddCoupen from "./Pages/Admin/AddCoupen";
import {
  AdminAuth,
  AdminLoginAuth,
  UserAuth,
  UserLoginAuth,
} from "./Authorization/Authorization";
import ViewUserProfile from "./Pages/Admin/ViewUserProfile";
import OrderViewPage from "./Pages/Admin/OrderViewPage";
import UserOrderViewPage from "./Pages/User/UserOrderViewPage";
import { BrandedMobiles } from "./Pages/User/BrandedMobiles";
import { ViewMobile } from "./Pages/User/ViewMobile";
import { ViewCart } from "./Pages/User/ViewCart";
import { Account } from "./Pages/User/Account";
import { Addresses } from "./Pages/User/Addresses";
import { Wishlist } from "./Pages/User/Wishlist";
import { CheckoutMultie } from "./Pages/User/CheckoutMultie";
import { UserOrders } from "./Pages/User/Orders";
import { OrderView } from "./Pages/User/OrderViewPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/mobiles/:brand" element={<BrandedMobiles />} />
          <Route path="/mobile/:name/:id" element={<ViewMobile />} />
          <Route element={<UserLoginAuth />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<UserAuth />}>
            <Route path="/viewcart" element={<ViewCart />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/orders" element={<UserOrders />} />
            <Route path="/account/order/:id" element={<OrderView />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<CheckoutMultie />} />
            <Route path="/account/addresses" element={<Addresses />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/order-success" element={<PaymentSuccess />} />
            <Route path="/order/view/:id" element={<UserOrderViewPage />} />
          </Route>

          {/* Admin Routes */}
          {/* <Route element={<AdminLoginAuth />}> */}
          <Route path="/admin" element={<AdminLogin />} />
          {/* </Route> */}
          {/* <Route element={<AdminAuth />}> */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/order/view/:id" element={<OrderViewPage />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
          <Route path="/admin/view-user/:id" element={<ViewUserProfile />} />
          <Route path="/admin/view-product/:id" element={<ViewProduct />} />
          <Route path="/admin/category" element={<AdminCategory />} />
          <Route path="/admin/brand" element={<Brand />} />
          <Route path="/admin/coupen" element={<Coupen />} />
          <Route path="/admin/add-coupen" element={<AddCoupen />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

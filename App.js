import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home.js";
import Login from "./components/auth/Login.js";
import Signup from "./components/auth/Signup.js";

// import productcategorylist from "./components/products/productcategorylist";
import Productdetail from "./components/products/Productdetail.js";
import { useSelector } from "react-redux";
import { selectUser } from "./store/auth/authSlice.js";
import Payment from "./components/cart/Payment.js";
import UserForm from "./components/cart/UserForm.js";
import SummaryCard from "./components/cart/SummaryCard.js";
import Myorder from "./components/cart/Myorder";
import SuccessOrder from "./components/cart/SuccessOrder.js";

import Layout from "./pages/admin/Layout.js";
import AdminDashboard from "./pages/admin/AdminDashboard.js";
import ManageAdmin from "./pages/admin/manageadmin/ManageAdmin";
import OrderAdmin from "./pages/admin/order/OrderAdmin.js";

import AddProduct from "./pages/admin/adminproducts/AddProduct";
import EditProduct from "./pages/admin/adminproducts/EditProduct";

import AddCategory from "./pages/admin/admincategory/AddCategory";
import UpdateCategory from "./pages/admin/admincategory/EditCategory";

import AddSlider from "./pages/admin/silder/AddSlider";
import ProductฺByName from "./components/products/ProductByName.js";
import ProductByCategory from "./components/products/ProductByCategory.js";

//EditCompany
import AddCompany from "./pages/admin/company/AddCompany";
import EditCompany from "./pages/admin/company/EditCompany";
import ListCompany from "./pages/admin/company/ListCompany.js";
function App() {
  return (
    <React.Fragment>
      <Navbar />

      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          {/* ค้นหาสินค้า โดย catagory */}
          <Route
            path="/product-category/:categoryfind/:nameCat"
            element={<ProductByCategory />}
          />
          {/* ค้นหาสินค้า โดย ชื่อ */}
          <Route path="/productsearch/:keyword" element={<ProductฺByName />} />
          {/* <Route
            path="/product-search/:productsearch"
            element={<ProductฺByName/>}
          /> */}
          <Route
            path="/payment"
            element={
              <RouteControl>
                <Payment />
              </RouteControl>
            }
          />

          {/* รายการสั่งซื้อสินค้าตาม User */}
          <Route
            path="/myorder/:id"
            element={
              <RouteControl>
                <Myorder />
              </RouteControl>
            }
          />
          <Route
            path="/success"
            element={
              <RouteControl>
                <SuccessOrder />
              </RouteControl>
            }
          />

          <Route
            path="/summary"
            element={
              <RouteControl>
                <SummaryCard />
              </RouteControl>
            }
          />

          {/* หน้าแรก admin  */}
          <Route
            path="/admin"
            element={
              <Layout>
                <RouteControlAdmin>
                  <AdminDashboard />
                </RouteControlAdmin>
              </Layout>
            }
          />

          <Route
            path="/add-slider"
            element={
              <Layout>
                <RouteControlAdmin>
                  <AddSlider />
                </RouteControlAdmin>
              </Layout>
            }
          />

          {/* หน้าแรก ร้านค้า  */}
          <Route
            path="/list-company"
            element={
              <Layout>
                <RouteControlAdmin>
                  <ListCompany />
                </RouteControlAdmin>
              </Layout>
            }
          />

          <Route
            path="/add-company"
            element={
              <Layout>
                <RouteControlAdmin>
                  <AddCompany />
                </RouteControlAdmin>
              </Layout>
            }
          />
          {/* update-company */}
          <Route
            path="/update-company/:id"
            element={
              <Layout>
                <RouteControlAdmin>
                  <EditCompany />
                </RouteControlAdmin>
              </Layout>
            }
          />

          <Route
            path="/add-product"
            element={
              <Layout>
                <RouteControlAdmin>
                  <AddProduct />
                </RouteControlAdmin>
              </Layout>
            }
          />

          <Route
            path="/update-product/:id"
            element={
              <Layout>
                <RouteControlAdmin>
                  <EditProduct />
                </RouteControlAdmin>
              </Layout>
            }
          />

          <Route
            path="/create-category"
            element={
              <Layout>
                <RouteControlAdmin>
                  <AddCategory />
                </RouteControlAdmin>
              </Layout>
            }
          />
          <Route
            path="/update-category/:id"
            element={
              <Layout>
                <RouteControlAdmin>
                  <UpdateCategory />
                </RouteControlAdmin>
              </Layout>
            }
          />
          <Route
            path="/manage-admin"
            element={
              <Layout>
                <RouteControlAdmin>
                  <ManageAdmin />
                </RouteControlAdmin>
              </Layout>
            }
          />
{/* admin รายการสั่งซื้อ  */}
          <Route
            path="/orders"
            element={
              <Layout>
                <RouteControlAdmin>
                  <OrderAdmin />
                </RouteControlAdmin>
              </Layout>
            }
          />
          {/* <Link to={`/productdetail/${p._id}/${p.category}`}></Link> */}
          <Route
            path="/productdetail/:id/:categoryId"
            element={<Productdetail />}
          />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
// เช็ค user login
export const RouteControl = ({ children }) => {
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

// เช็ค Admin login
export const RouteControlAdmin = ({ children }) => {
  const user = useSelector(selectUser);
  // alert(JSON.stringify(user))
  if (user.role === `admin`) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

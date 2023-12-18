import React, { useEffect } from "react";

import ProductAdminList from "./adminproducts/ProducAdmintList.js";
import { getProducts } from "../../store/product/productSlice";

import { useDispatch, useSelector } from "react-redux";



const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);


  // useEffect(() => {
  //   dispatch(FILTER_PRODUCTS({ products, search }));
  // }, [products, search, dispatch]);


  return (
    <div className="">
      <ProductAdminList products={products} />
    </div>
  );
};

export default Dashboard;

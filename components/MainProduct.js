import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/product/productSlice";
import NewProduct from "./products/NewProduct.js";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCategories } from "../store/category/categorySlice";
import { Link } from "react-router-dom";
import Flash from "./products/Flash";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Products from "./products/Products";
import {Category} from "./category/Category.js";
import ProductCategory from "./products/ProductCategory";


const MainProduct = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const Psort = products.slice().sort((a, b) => a.createdAt - b.createdAt);
  // categorys
  const { categorys } = useSelector((state) => state.category);

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
    
     {/* <section class="relative py-32 lg:py-36 bg-white">
        <div class="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div class="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 hidden lg:block">
            <span class="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-green-400 blur-xl opacity-60 lg:opacity-95 lg:block hidden"></span>
            <span class="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-blue-600 blur-xl opacity-80"></span>
          </div>

          <span class="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-blue-600 to-green-400 absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
          <div
            class="relative flex flex-col items-center text-center lg:text-left lg:py-7 xl:py-8 
            lg:items-start lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2"
          >
            <h1
              class="text-3xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl
            font-bold text-gray-900"
            >
              ร้านค้าออนไลน์
              <br></br>
              <span class="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 from-20% via-blue-600 via-30% to-green-600">
              </span>
              is the Best Ever.
            </h1>
            <p class="mt-8 text-gray-700">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores

            </p>
            <div class="mt-10  w-full flex max-w-md mx-auto lg:mx-0">
              <div class="flex sm:flex-row flex-col gap-5 w-full"></div>
            </div>
          </div>

          <div class="flex flex-1 lg:w-1/2 lg:h-auto relative lg:max-w-none lg:mx-0 mx-auto max-w-3xl">
            <img src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZvqCl0Y55uLoYL7WrlYsLvfPibbHJkmqqbQ&usqp=CAU"
           
                class="lg:absolute lg:w-full lg:h-full rounded-3xl  lg:max-h-none " />
        </div>

        </div>
      </section>  */}
      {/* <hr></hr>  */}

      {/* หน้า category */}
      <Category  />

      {/* New Product */}
      {/* <NewProduct products={products} /> */}

      {/* รายการ Flash */}
      <Flash products={products} />

      
      {/* รายการ Products */}
      <Products />
    </div>
  );
};

export default MainProduct;

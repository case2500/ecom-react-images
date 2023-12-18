import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Card from "./Card.js";

const Cate = ({ categorys }) => {
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 100;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 100;
  };

  const scrollLeft = () => {
    document.getElementById("content").scrollLeft -= 400;
  };
  const scrollRight = () => {
    document.getElementById("content").scrollLeft += 400;
  };

  return (
    <div className="mt-2">
      <div className="relative ">
        <div className="py-4 text-xl font-bold text-center"> หมวดหมู่สินค้า</div>
        <div className="absolute right-0 top-5 ">
          <button
            onClick={scrollLeft}
            className="p-2 m-2 bg-white rounded-full"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 m-2 bg-white rounded-full"
          >
            <FiChevronRight />
          </button>
        </div>
        <div className="flex justify-center px-auto">
          <div
            id="content"
            className="flex flex-row items-center justify-start p-4 overflow-x-auto carousel scroll-smooth scrollbar-hide"
          >
            {categorys.map((item, index) => (
              <Link to={`/product-category/${item._id}/${item.name}`}>
                <div className="text-center lg:pl-12  ">
                  <img
                    className="inline-block h-32 py-2 mx-10  "
                    src={item.image.filePath}
                    alt="/"
                  />
                  <h2 className="w-40 mx-1 font-bold text-center text-xl">
                    {item.name}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cate;

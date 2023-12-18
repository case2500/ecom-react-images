import React, { useState } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { BsFillCartFill, BsFillSaveFill } from "react-icons/bs";
import { addToCart } from "../../store/cart/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Productcategorylist = ({ resultfilter, nameCat }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="grid grid-cols-2 md:gap-1 md:grid-cols-5  lg:gap-1 lg:grid-cols-5">
      {resultfilter.length ? (
        resultfilter.map((p) => (
          <div className="bg-white border border-gray-200 rounded-lg shadow md:px-5 hover:scale-105 my-10">
            <Link to={`/productdetail/${p._id}/${p.category}`}>
              <div>
                <img
                  src={p.images[0].url}
                  className="mx-auto   h-48 object-cover mt-5 "
                />
              </div>

              <div className="mx-auto my-2 text-center ">
                <h5 className="px-1 font-bold tracking-tight text-gray-400 text-md dark:text-white">
                  <p>{p.name}</p>
                </h5>
              </div>
            </Link>
            <div className="flex flex-row justify-between py-2 mx-2">
              <div className="mr-5 text-xl text-orange-500 "> ฿{p.price}</div>
              <button
                onClick={() => dispatch(addToCart({ ...p, quantity }))}
                className="px-5 text-xl text-red-600 bg-white border border-gray-100 rounded-md "
              >
                <BsFillCartFill size={20} className="mr-2" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <>
          <img
            src={`data:image/png;base64,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`}
          />
        </>
      )}
    </div>
  );
};

export default Productcategorylist;

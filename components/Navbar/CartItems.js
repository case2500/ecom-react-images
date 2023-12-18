import React from "react";
import { Link } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";

const CartItems = ({ cartItems }) => {
  return (
    <div>
      <Link to="/payment">
        <button className="flex flex-row px-1 py-2 mx-8 text-red-500 bg-red-100 rounded-md lg:mx-5">
          <div>
            <BsFillCartFill size={30} className="text-red-500 lg:mx-2" />
          </div>
          <div>
            {/* {JSON.stringify(cartItems.cart)} */}
            {cartItems.cart.reduce((sum, item) => sum + item.quantity, 0)}
          </div>
        </button>
      </Link>
    </div>
  );
};

export default CartItems;

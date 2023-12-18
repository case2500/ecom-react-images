import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import MenuDesktop from "./MenuDesktop.js";
import Sidedrawer from "./Sidedrawer.js";
import CartItems from "./CartItems.js";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const authtoken = JSON.parse(localStorage.getItem("token"))
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart);
  const [keyword, setKeyword] = useState("");
  const handleLogout = async () => {
    try {
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(event);
    navigate(`/productsearch/${keyword}`);
  };

  return (
    <div className="flex items-center justify-between w-full px-4 mx-auto bg-white shadow-md ">
      <div className="flex items-center">
        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer lg:hidden contents "
        >
          <AiOutlineMenu size={30} />
        </div>

        <h1 className="px-2 text-2xl sm:text-3xl lg:text-4xl">
          <Link to="/">
            Best <span className="font-bold">Shop</span>
          </Link>
        </h1>
      </div>

      {/* Search Input */}
      <div className="bg-gray-200 rounded-md flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
        <AiOutlineSearch size={25} />
        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-2 text-xs bg-transparent focus:outline-none md:text-xl"
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search foods"
          />
        </form>
      </div>

      {/* Menu */}
      <MenuDesktop
        authtoken={authtoken}
        handleLogout={handleLogout}
        user={user}
      />

      <div>
        {authtoken ? (
          <section div className="hidden md:block">
            <button
              className="px-5 py-2 mx-2 bg-gray-200 rounded-md "
              onClick={() => {
                handleLogout();
              }}
            >
              <div> {user.name} </div> <div>Logout</div>
            </button>
          </section>
        ) : (
          <button className="mx-2 ">
            <Link to="/login">Login</Link>
          </button>
        )}
      </div>

      <CartItems cartItems={cartItems} />

      {/*Mobile Menu Side drawer menu */}
      <Sidedrawer
        AuthToken={authtoken}
        handleLogout={handleLogout}
        setNav={setNav}
        nav={nav}
      />
    </div>
  );
};

export default Navbar;

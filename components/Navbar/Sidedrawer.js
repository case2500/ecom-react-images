import React from "react";
import { AiOutlineClose, AiFillTag } from "react-icons/ai";

import { TbTruckDelivery } from "react-icons/tb";
import { FaWallet } from "react-icons/fa";
import { MdFavorite, MdHelp } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidedrawer = ({ handleLogout, authtoken, nav, setNav }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {nav ? (
        <div className="fixed top-0 left-0 z-10 w-full h-screen bg-black/80"></div>
      ) : (
        ""
      )}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300 z-55"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300 z-555 "
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute cursor-pointer right-4 top-4 "
        />
        <h2 className="p-4 text-2xl">
          Best <span className="font-bold">Eats</span>
        </h2>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800 ">
            <Link to="/">
              <li className="flex py-4 text-xl">
                <TbTruckDelivery size={25} className="mr-4" /> หน้าแรก
              </li>
            </Link>
            <li className="flex py-4 text-xl">
              <MdFavorite size={25} className="mr-4" /> Favorites
            </li>
            <li className="flex py-4 text-xl">
              <FaWallet size={25} className="mr-4" /> Wallet
            </li>
            <li className="flex py-4 text-xl">
              <MdHelp size={25} className="mr-4" /> Help
            </li>
            <li className="flex py-4 text-xl">
              <AiFillTag size={25} className="mr-4" /> Promotions
            </li>
            <li>
              {authtoken ? (
                <>
                  <button
                    className="px-5 mx-5 bg-gray-200 rounded-md"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button className="mx-2">
                  <Link to="/login">Login</Link>
                </button>
              )}
            </li>

            <li className="flex px-5 py-4 text-md">
              {authtoken ? user.name : null}
            </li>
            <li className="flex py-4 text-xl"></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidedrawer;

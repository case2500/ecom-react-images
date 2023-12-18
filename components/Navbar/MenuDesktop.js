import React from 'react'
import { MdFavorite, MdHelp } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { FaWallet } from "react-icons/fa";
import { Link } from "react-router-dom";

const MenuDesktop = ({user, authtoken }) => {

  return (
    <div>      
    <div className="hidden md:contents">
      <nav>
        <ul className="flex flex-row p-4 text-gray-800">
          <Link to="/">
            <li className="flex py-4 mr-4 text-xl">
              <TbTruckDelivery size={25} className="mr-2" /> หน้าแรก
            </li>
          </Link>
          <li className="flex py-4 mr-4 text-xl">
            <MdFavorite size={25} className="mr-2" /> Favorites
          </li>
          <li className="flex py-4 mr-4 text-xl">
            <FaWallet size={25} className="mr-2" /> Wallet
          </li>
          <li className="flex py-4 mr-4 text-xl">
            <MdHelp size={25} className="mr-2" /> ติดต่อเรา
          </li>

          <Link to={`/myorder/${user.id}`}>
            <li className="flex py-4 mr-4 text-xl">
              {authtoken && <>ประวิติสั่งซื้อ </>}
            </li>
          </Link>
        </ul>
      </nav>
    </div></div>
  )
}

export default MenuDesktop;
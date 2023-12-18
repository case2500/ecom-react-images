import React from "react";
import { Link } from "react-router-dom";
const SuccessOrder = () => {
  return (
    <div className="w-full mx-auto text-4xl text-center mt-10 ">
      <h1> ทางเราได้รับออเดอร์ของคุณแล้ว </h1>

      <div className="flex flex-row justify-center my-10">
        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCdq17ODyVP5KhkIdevuzE0LIjAx-i1whFzQ&usqp=CAU"} className="object-contain h-32 px-2 md:h-32" />
      </div>
      <h1> ขอบคุณที่สั่งซื้อสินค้ากับเรา </h1>
      <div className="flex justify-center mt-10">
        <Link to={`/`}>
          <button className="w-64 p-2 mb-5 text-center text-white bg-green-500 border rounded-md hover:bg-green-600 hover:text-white hover:border-transparent">
            หน้าแรก
          </button>
        </Link>
      </div>
      <hr></hr>
    </div>
  );
};

export default SuccessOrder;

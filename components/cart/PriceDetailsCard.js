import React, { useEffect } from "react";
import {
  CLEAR_CART,
} from "../../store/cart/cartSlice";
import { saveOrder } from "../../store/order/orderSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";

export default function PriceDetailsCard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const authtoken = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const history = useNavigate();

  const totalpro = cart.cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalprice = parseFloat(
    cart.cart.reduce((acc, item) => acc + item.quantity * item.price, 0)
  );

  const AddOrder = async (formData) => {
    if (!user.bio) {
      Swal.fire("กรุณาป้อนที่อยู่ในการจัดส่ง");
      return;
    }
    dispatch(saveOrder({ authtoken, formData }));

    Swal.fire("รายการสั่งซื้อสำเร็จ");
    dispatch(CLEAR_CART());
    // navigate(`/myorder/${user.id}`, { replace: true });
    navigate(`/success`);
  };

  function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const authLink = async () => {
    const { exp } = jwt_decode(authtoken);
    const expirationTime = exp * 1000 - 60000;
    if (Date.now() >= expirationTime) {
      Swal.fire("กรุณาlogin");
      localStorage.clear();
      history("/login");
    }

  };

  useEffect(() => {
    authLink();
  }, []);

  return (
    <div>
      <div class=" md:flex md:justify-center   lg:flex lg:justify-center mt-5">
        <div class=" md:max-w-[850px] lg:max-w-[850px]  flex-initial text-gray-700 text-center bg-gray-50 md:px-16 lg:px-16 rounded-md   py-2 m-2 ">
          <b className="md:text-2xl lg:text-2xl">จำนวนรายการ : {totalpro} รายการ</b>

          <table class="md:w-full lg:w-full text-sm text-left text-gray-500  lg:block md:block">
            {cart&&cart.cart.map((p, index) => (
              <>
                <tr class="bg-white border-b ">
                  <td class="md:px-2 py-4 lg:px-2">
                    <b className="text-gray-500"> {index + 1}. </b>
                  </td>
                  <td
                
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    <img
                      src={p.cover}
                      alt=""
                      className="object-fit  max-h-[350px]  "
                    />
                  </td>
                  <td class="md:px-6 py-4">
                    <b className="text-gray-400 md:text-xl"> {p.name} </b>
                  </td>
                  <td class="px-1 py-4 text-end text-gray-400">
                    <b className="text-xl text-gray-300 ">{p.quantity}</b>
                  </td>
                  <td class="px-13 py-4 text-end">
                    <b className="text-xl text-gray-300">x</b>
                  </td>
                  <td class="px-1 py-4 text-end">
                    <b className="text-xl text-gray-300">{p.price}</b>
                  </td>

                  <td class="px-6 py-4 text-right text-xl">
                    <b className=""> {currencyFormat(p.price * p.quantity)} </b>
                  </td>
                </tr>
              </>
            ))}

            <tbody></tbody>
          </table>

          <div className="flex flex-row justify-between px-10 my-5 md:px-32">
            <div className="md:text-xl">ยอดรวม : </div>
            <div className="md:text-xl">฿{currencyFormat(totalprice)}</div>
          </div>

          <div className="flex flex-row justify-between px-10 mb-5 md:px-32 ">
            <div className="md:text-xl">ค่าจัดส่ง : </div>
            <div className="md:text-xl"> ฿0</div>
          </div>

          <div className="flex flex-row justify-between px-10 mb-5 md:px-32">
            <div className="md:text-xl">การชำระเงินทั้งหมด : </div>
            <div className=" md:text-xl">฿{currencyFormat(totalprice)}</div>
          </div>

          <div className="flex justify-center my-5">
            {totalpro > 0 ? (
              <button
                disabled={false}
                onClick={() => {
                  AddOrder({
                    userid: user.id,
                    orderItems: cart.cart,
                    totalprice: totalprice,
                  });
                }}
                className="w-32 p-2 mt-5 text-center text-white bg-red-600 border md:w-64 md:text-2xl hover:bg-red-800 hover:text-white hover:border-transparent"
              >
                สั่งซื้อสินค้า
              </button>
            ) : (
              <>
                <button
                  disabled={true}
                  className="w-64 p-2 mt-5 text-2xl text-center text-white bg-gray-300 border hover:text-white hover:border-transparent"
                >
                  ไม่มีรายการสินค้า
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

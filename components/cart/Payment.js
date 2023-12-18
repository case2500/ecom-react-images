import React from "react";
import {
  decrementQuantity,
  removeItem,
  incrementQuantity,
} from "../../store/cart/cartSlice";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Payment() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const totalpro = cart.cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalprice = parseFloat(
    cart.cart.reduce((acc, item) => acc + item.quantity * item.price, 0)
  );

  const Increment = (p) => {
    dispatch(incrementQuantity(p));
  };
  //Decreate
  const Decrement = ({ id, cover, name, price }) => {
    dispatch(decrementQuantity({ id, name, price, cover }));
  };
  //Remove
  const remove = ({ id, cover, name, price }) => {
    dispatch(decrementQuantity({ id, name, price, cover }));
  };

  function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  return (
    <div>
      <div class=" md:flex md:justify-center mt-5 ">
        <div class=" md:w-[1024px] flex-initial hidden md:block text-gray-700 text-center bg-gray-50 md:px-16 rounded-md   py-2 m-2 ">
          <div class="md:w-[1024px] md:container mx-auto">
            {cart.cart.length < 1 ? (
              <p className="mt-5 text-2xl">ไม่มีรายการในตะกร้าสินค้า</p>
            ) : null}
          </div>
          <table class="md:w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            {cart.cart.map((p, index) => (
              <>
                <tr class="bg-white border-b ">
                  <td class="md:px-2 py-2">
                    <b className="text-gray-500"> {index + 1}. </b>
                  </td>
                  <td
                    scope="row"
                    class="md:px-6 px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {/* {JSON.stringify(p.cover.url)}  */}
                    <img
                      src={p.cover && p.cover.url}
                      alt=""
                      className="hidden object-fit md:block"
                    />
                  </td>

                  <td class="md:px-6 py-2 min-w-[160px]">
                    <b className=" text-md md:text-xl">{p.name.slice(0, 40)}</b>
                  </td>
                  <td class="md:px-6 py-2 text-end">
                    <b className="hidden text-gray-400 md:text-xl md:block">
                      {currencyFormat(p.price)}
                    </b>
                  </td>
                  <td class="px-6 py-2">
                    <div className="flex items-center gap-3 md:gap-4">
                      <button
                        className="p-1 text-xs text-gray-100 bg-red-300 rounded-md md:mr-3 disabled:cursor-not-allowed"
                        onClick={() => {
                          Decrement({
                            id: p.id,
                            cover: p.cover,
                            name: p.name,
                            price: p.price,
                          });
                        }}
                      >
                        <AiOutlineMinus size={20} />
                      </button>
                      <span className="h-full text-xs md:text-2xl md:w-10 bg-black/[0.075] md:mr-3 rounded-sm flex items-center justify-center">
                        {p.quantity}
                      </span>
                      <button
                        className="p-1 text-xs text-white bg-green-400 rounded-md disabled:cursor-not-allowed"
                        onClick={() => {
                          Increment(p);
                        }}
                      >
                        <AiOutlinePlus size={20} />
                      </button>
                    </div>
                  </td>
                  <td class="md:px-6 py-2 text-right md:text-xl">
                    <b className=""> {currencyFormat(p.price * p.quantity)} </b>
                  </td>
                  <td>
                    <b
                      className="text-red-500 cursor-pointer d:mx-5 md:px-5 md:py-1 md:text-xl text-md"
                      onClick={() => {
                        dispatch(removeItem(p.id));
                      }}
                    >
                      X
                    </b>
                  </td>
                </tr>
                {/* {JSON.stringify(cart.cart)} */}
              </>
            ))}
          </table>
        </div>
        {/* phone  */}
        <div class="w-full md:hidden lg:hidden ">
          {cart &&
            cart.cart.map((p, index) => (
              <main className=" ">
                <table class="md:w-full  text-left text-gray-500 dark:text-gray-400 ">
                  <tr>
                    <td className="text-xl w-64">
                      {" "}
                      {index + 1}. {p.name.slice(0, 40)}
                    </td>

                    <td>
                      {" "}
                      <button
                        className="p-2 mr-3 text-xs text-gray-100 bg-red-200 rounded-md disabled:cursor-not-allowed"
                        onClick={() => {
                          Decrement({
                            id: p.id,
                            cover: p.cover,
                            name: p.name,
                            price: p.price,
                          });
                        }}
                      >
                        <AiOutlineMinus size={20} />
                      </button>
                    </td>

                    <td>
                      <span className="h-full text-2xl w-10 bg-black/[0.075] mr-3 rounded-sm flex items-center justify-center">
                        {p.quantity}
                      </span>
                    </td>
                    <td>
                    <button
                      className="p-2 text-xs text-white bg-green-400 rounded-md disabled:cursor-not-allowed"
                      onClick={() => {
                        Increment(p);
                      }}
                    >
                      <AiOutlinePlus size={20} />
                    </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-48">
                    <span className="h-full px-5 mx-5 py-1 text-xl  bg-black/[0.075]  rounded-md  ">
                      {currencyFormat(p.price * p.quantity)}
                    </span>
                    </td>
                    <td>
                    <button
                      className="px-2 py-2 mr-5 text-xl text-red-500 rounded-md md:mx-5 md:px-5 md:py-2"
                      onClick={() => {
                        dispatch(removeItem(p.id));
                      }}
                    >
                      X
                    </button>
                    </td>
                  </tr>
                  <hr></hr>
                </table>


              </main>
            ))}
        </div>

        <div class="flex-initial text-gray-700 text-center bg-gray-100 px-4 py-2 m-2">
          <div className="bg-gray-100 divide-y rounded-md basis-1/6 ">
            <div className="flex flex-row justify-center px-2 py-2 my-5 bg-white">
              <b className="text-2xl">จำนวนรายการ : {totalpro} รายการ</b>
            </div>
            <div className="flex flex-row justify-between px-10 my-5 ">
              <div className="text-xl">ยอดรวม : </div>
              <div className="text-xl">฿{currencyFormat(totalprice)}</div>
            </div>

            <div className="flex flex-row justify-between px-10 mb-5 ">
              <div className="text-xl">ค่าจัดส่ง : </div>
              <div className="text-xl"> ฿0</div>
            </div>

            <div className="flex flex-row justify-between px-10 mb-5">
              <div className="text-xl">การชำระเงินทั้งหมด : </div>
              <div className="text-xl text-red-500 border-b-2">
                ฿{currencyFormat(totalprice)}
              </div>
            </div>

            <div className="flex justify-center my-5">
              {totalpro > 0 ? (
                <Link to="/summary">
                  <button
                    disabled={false}
                    className="w-64 p-2 mt-5 text-2xl text-center text-white bg-red-600 border hover:bg-red-800 hover:text-white hover:border-transparent"
                  >
                    checkOut
                  </button>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

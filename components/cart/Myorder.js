import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment/min/moment-with-locales";
import { selectUser } from "../../store/auth/authSlice.js";
import { useNavigate, Link } from "react-router-dom";
import { getOrder } from "../../store/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import {URL} from "../../URL.js"
import Swal from "sweetalert2";
import Modal from "./Modal";

const Myorder = ({ match }) => {
  const { id } = useParams();
  const [list, setList] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const myorder = useSelector((state) => state.order);
  const authtoken = JSON.parse(localStorage.getItem("token"))
  const [showModal, setShowModal] = useState(false);
  const [getuser, setGetUser] = useState(user);
  const history = useNavigate();

  const handlecancleorder = (authtoken, id) => {
    Swal.fire({
      title: "ต้องการยกเลิกรายการสินค้า?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = axios.put(
          `${URL}order/` + id,
          {},
          {
            headers: {
              authtoken,
            },
          }
        );
        setList(!list);
      }
    });
  };

  function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  useEffect(() => {
    dispatch(getOrder({ authtoken, id }));
  }, [dispatch, list, id, user]);
  return (
    <>
      {/* {JSON.stringify(user)} */}
      <main className="container min-h-[650px] mx-auto mt-5 mb-5">
        <div className="grid gap-1 md:grid-cols-4">
          <div>
            {showModal ? (
              <div className="px-10 py-10">
                <Modal
                  setShowModal={setShowModal}
                  showModal={showModal}
                  getuser={getuser}
                />
              </div>
            ) : null}

            <p className="px-5 py-2 mx-5 mb-2 text-xl text-center bg-gray-200">
              ที่อยู่จัดส่ง
            </p>
            <div className="px-5 py-2 mx-5 mb-2 text-xl bg-gray-200 text-start ">
              <div>ชื่อ {user.name}</div>
              <div>ที่อยู่ : {user.bio}</div>
              <div>เบอร์โทร : {user.phone}</div>

              <div className="px-5 py-2 mb-2 text-xl text-center ">
                <button
                  className="px-5 py-2 mx-5 mt-5 text-white bg-blue-500 rounded-md md:text-xl"
                  onClick={() => {
                    setShowModal(!showModal);
                  }}
                >
                  เปลื่ยนแปลงที่อยู่
                </button>
              </div>
            </div>
          </div>

          <div className="grid px-4 md:col-span-3">
            <p className="px-5 py-2 mb-2 text-center bg-gray-200 md:text-xl">
              รายการ
            </p>
            {myorder &&
              myorder.order.map((p, indexpro) => (
                <div key={indexpro}>
                  <div className="px-2 py-2 text-xs bg-blue-200 md:flex md:px-5 md:py-2 md:text-xl md:justify-between md:flex-row">
                    <diV>เลขที่บิล : {p.autonumber}</diV>
                    <div>
                      วันที่{" "}
                      {moment(p.dateOrdered)
                        .locale("th")
                        .add(543, "years")
                        .format("D MMM YYYY")}
                    </div>
                    <div> Tracking: {p.Noshipping} </div>
                    <div>ขนส่ง: {p.deliverycompany} </div>
                  </div>

                  <div className="w-auto px-2 py-2 text-xs bg-gray-50">
                    <div className="grid grid-cols-4 md:text-xl">
                      <div className="grid justify-items-center">รายการ</div>
                      <div className="grid justify-items-center">
                        ราคา/หน่วย
                      </div>
                      <div className="grid justify-items-center">จำนวน</div>
                      <div className="grid justify-items-end">ยอดรวม</div>
                    </div>
                  </div>
                  <div className="w-auto text-xs">
                    {p.orderItems.map((pq, index) => (
                      <div className="grid grid-cols-4 md:text-xl" key={index}>
                        <div className="grid block text-gray-400 justify-items-start md:hidden">
                          {index + 1}.{pq.product && pq.product.name.substring(0,20)}
                        </div>
                        <div className="grid hidden text-gray-400 justify-items-start md:block">
                          {index + 1}.{pq.product && pq.product.name.substring(0,26)}
                        </div>
                        <div className="grid justify-items-center">
                          {pq.quantity}
                        </div>
                        <div className="grid justify-items-center">
                          {currencyFormat(Number(pq.product && pq.product.price))}
                        </div>

                        <div className="grid justify-items-end ">
                          {currencyFormat(Number(pq.quantity * (pq.product && pq.product.price)))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-auto text-xs">
                    <hr></hr>
                    <div className="grid grid-cols-4 text-xs md:text-xl">
                      <div className="grid justify-items-center">
                        สถานะการสั่งซื้อ : {p.status}
                      </div>
                      <div className="grid justify-items-start"></div>
                      <div className="grid justify-items-end"> ราคารวม</div>
                      <div className="grid ext-red-700 justify-items-end">
                        {currencyFormat(p.totalPrice)}
                      </div>
                    </div>
                    <hr className="my-1 text-red-400 "></hr>
                    {p.status !== "ยกเลิก" ? (
                      <button
                        onClick={() => {
                          handlecancleorder(authtoken, p._id);
                        }}
                        className="inline-flex items-center px-4 py-1 ml-4 font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-green-500 border border-transparent rounded-md text-md active:bg-gray-900 false"
                      >
                        ยืนยันยกเลิกสั่งซื้อ
                      </button>
                    ) : (
                      <button className="inline-flex items-center px-4 py-2 ml-4 font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-red-500 border border-transparent text-md text-xL active:bg-gray-900 false">
                        ยกเลิกสั่งซื้อ
                      </button>
                    )}
                  </div>
                  <hr className="mt-2 text-red-400"></hr>
                  <br></br>
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Myorder;

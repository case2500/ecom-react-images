import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { ImPencil } from "react-icons/im";
import Search from "./Search";
import Modal from "react-modal";
import {
  getOrders,
  handleChangeStatus,
  handleChangeCompany,
  handleChangeNoShip,
} from "../../../store/order/orderSlice.js";

import {
  FILTER_ORDERS,
  // selectFilteredProducts,
} from "../../../store/order/orderfilterSlice.js";

import ModalForm from "./ModalFrom.js";

const OrderAdmin = () => {
  const dispatch = useDispatch();

  const [ship, setShip] = useState("");
  const delivery = ["ยกเลิก", "Pending", "ชำระเงิน", "ดำเนินการส่ง", "สำเร็จ"];
  const [showModal, setShowModal] = React.useState(false);
  const [showdelivery, setShowdelivery] = React.useState(false);

  const text_token = localStorage.getItem("token");
  const authtoken = JSON.parse(text_token);

  const orders = useSelector((state) => state.order);
  const searchorders = orders.orders;
  const searchResult = useSelector((state) => state.orderfilter.filterOrders);
  const [search, setSearch] = useState("");

  const [items, setItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //setDatamodal
  const [datamodal, setDatamodal] = useState([]);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const getOrderList = async (authtoken) => {
    await dispatch(getOrders(authtoken));
  };

  const handleStatus = async (orderId, e) => {
    const formData = {
      _id: orderId,
      newstatus: e.target.value,
    };
    try {
      await dispatch(handleChangeStatus({ authtoken, formData }));
      Swal.fire("เปลื่ยนสถานะเป็น " + formData.newstatus);
      getOrderList(authtoken);
    } catch (error) {
      alert(error);
    }
  };

  //handleChangeCompany
  const handleCompany = async (orderId, e) => {
    const formData = {
      _id: orderId,
      newdeliverycompany: e.target.value,
    };
    try {
      await dispatch(handleChangeCompany({ authtoken, formData }));
      Swal.fire("เลือกบริษัทคนส่ง=" + formData.newdeliverycompany);
      getOrderList(authtoken);
    } catch (error) {
      alert(error);
    }
  };

  const handleNoShip = async (orderId, e) => {
    const formData = {
      _id: orderId,
      newNoshipping: e.target.value,
    };
    try {
      await dispatch(handleChangeNoShip({ authtoken, formData }));
      getOrderList(authtoken);
    } catch (error) {
      alert(error);
    }
  };

  const [product, setProduct] = useState("");
  const { orderItems, name } = orders.orders;

  useEffect(() => {
    getOrderList(authtoken);
  }, [dispatch]);

  useEffect(() => {
    dispatch(FILTER_ORDERS({ searchorders, search }));
  }, [orders, search, dispatch]);

  function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  function setShow(e) {
    // alert(JSON.stringify(e));
    setDatamodal(e);
    setShowModal(true);
  }

  return (
    <div>
      <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      {/* {JSON.stringify(searchResult)} */}

      <div className="my-5">
        {/* <button
          className="px-5 py-2 mx-auto bg-green-400 rounded-md"
          onClick={() => {
            setModalIsOpen(!modalIsOpen);
          }}
        >
          แสดงรายการ
        </button> */}

        {/* <button
          className="px-5 py-2 mx-auto bg-blue-400 rounded-md"
          onClick={() => {
            setShowdelivery(!showdelivery);
          }}
        >
          แสดงรายการขนส่ง
        </button> */}

        <ModalForm
          setShowModal={setShowModal}
          datamodal={datamodal}
          showModal={showModal}
        />
      </div>
      <div>
        <table className="text-sm text-left text-gray-500 border w-1/8 px-96 dark:text-gray-400 border-spacing-1">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th className="px-1 py-3 text-xl">No</th>
              <th className="px-2 py-3 text-xl text-center ">บิลเลขที่</th>
              <th className="px-20 py-3 w-[100px] text-xl  ">ชื่อ</th>
              <th className="px-1 py-3 text-xl">ราคา</th>
              <th className="w-48 px-1 py-3 text-xl text-center">
                วัน/เดือน/ปี
              </th>

              {showdelivery && (
                <>
                  <th className="px-1 py-3 text-xl md:text-center">สถานะ</th>
                  <th className="px-1 py-3 text-xl md:text-center">
                    บริษัทขนส่ง
                  </th>
                  <th className="px-1 py-3 text-xl md:text-center">
                    เลขที่ขนส่ง
                  </th>
                  <th className="px-1 py-3 text-xl md:text-center">Action</th>
                </>
              )}
              {showModal && <th className="px-1 py-3 text-xl">รายการสินค้า</th>}
            </tr>
          </thead>
          <tbody>
            {/* {JSON.stringify(orders.orders.orderItems)} */}
            {searchResult &&
              searchResult.map((item, index) => (
                <>
                  <tr className="bg-white border-b ">
                    {/* <td className="w-10 px-1 py-2">{index + 1} {item._id}</td> */}
                    <td className="w-10 px-1 py-2">{index + 1}</td>
                    <td className="w-16 px-10 text-xl "> {item.autonumber}</td>
                    <td className="w-32 px-5 py-2 text-xl bg-gray-50 ">
                      {item.user && item.user.name}
                    </td>
                    <td className="w-32 px-1 py-2 text-xl text-right">
                      {currencyFormat(item.totalPrice)}
                    </td>

                    <td className="w-32 px-1 py-2 text-xl text-right bg-gray-50 md:text-center">
                      {item.dateOrdered.substring(0, 10)}
                    </td>
                    {
                      <>
                        {item?.status === `ยกเลิก` ? (
                          <>
                            <td className="w-32 px-1 py-2 text-xl ">
                              <select
                                name="role"
                                onChange={(e) => handleStatus(item._id, e)}
                                required
                                className="block pr-4 mb-1 font-bold text-center text-red-500 "
                                value={item?.status}
                              >
                                <option>Please Select </option>
                                {delivery.map((item, index) => (
                                  <option key={index} value={item}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="w-32 px-1 py-2 text-xl ">
                              <select
                                name="role"
                                onChange={(e) => handleStatus(item._id, e)}
                                required
                                className="block pr-4 mb-1 font-bold text-gray-500 border border-amber-200 md:text-center md:mb-0"
                                value={item?.status}
                              >
                                <option>Please Select </option>
                                {delivery.map((item, index) => (
                                  <option key={index} value={item}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="w-32 px-1 py-2 text-xl bg-blue-100">
                              <select
                                name="role"
                                required
                                className="block pr-4 mb-1 font-bold text-gray-500 border border-amber-200 md:text-center md:mb-0"
                                onChange={(e) => handleCompany(item._id, e)}
                                value={item?.deliverycompany}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Kerry Express">
                                  Kerry Express
                                </option>
                                <option value="Flash express">
                                  Flash express
                                </option>
                                <option value="Best express">
                                  Best express
                                </option>
                                <option value="ไปรษณีย์">ไปรษณีย์</option>
                              </select>
                            </td>
                            <td className="w-24 text-xl ">
                              <input
                                type="text"
                                placeholder=""
                                name="Noshipping"
                                className="flex w-48 mb-2 border md:text-center"
                                value={item?.Noshipping}
                                onChange={(e) => handleNoShip(item._id, e)}
                              />
                            </td>

                            <td>
                              <button
                                className="px-6 py-3 mb-1 mr-1 font-bold text-black bg-blue-200 rounded shadow outline-none active:bg-blue-500 hover:shadow-lg focus:outline-none"
                                type="button"
                                onClick={(e) => setShow(item)}
                              >
                                รายการสินค้า
                              </button>
                            </td>
                          </>
                        )}
                      </>
                    }
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>

      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Item Form Modal"
        className="px-10 bg-red-200 py-96 "
      >
        <input
          type="text"
          placeholder="Item name"
          value={name}
          //   onChange={(e) => setName(e.target.value)}
        />

        <button onClick={closeModal}>Cancel</button>
      </Modal> */}
    </div>
  );
};

export default OrderAdmin;

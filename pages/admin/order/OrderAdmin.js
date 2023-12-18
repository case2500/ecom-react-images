import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
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
  const delivery = ["ยกเลิก", "Pending", "ชำระเงิน", "ดำเนินการส่ง", "สำเร็จ"];
  const [showModal, setShowModal] = React.useState(false);
  const [showdelivery, setShowdelivery] = React.useState(false);

  const authtoken = JSON.parse(localStorage.getItem("token"));

  const orders = useSelector((state) => state.order);
  const searchorders = orders.orders;
  const searchResult = useSelector((state) => state.orderfilter.filterOrders);
  const [search, setSearch] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //setDatamodal
  const [datamodal, setDatamodal] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

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

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedOption(e);
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
      {/* {JSON.stringify(searchResult)} */}
      <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="my-5">
        <ModalForm
          setShowModal={setShowModal}
          datamodal={datamodal}
          showModal={showModal}
          searchResult={searchResult}
        />
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th  class="px-6 text-xl py-3 ">
                No
              </th>
              <th  class="px-1 text-xl py-3">
                บิลเลขที่
              </th>
              <th  class="px-6 text-xl py-3">
                ชื่อ
              </th>
              <th  class="px-6 text-xl py-3">
                ราคา
              </th>
              <th  class="px-12 text-xl py-3">
                วัน/เดือน/ปี
              </th>
              <th  class="px-6 text-xl py-3">
                สถานะ
              </th>
              <th  class="px-6 text-xl py-3">
                บริษัทขนส่ง
              </th>
              <th  class="px-6 text-xl py-3">
                เลขที่ขนส่ง
              </th>
              <th  class="px-6 text-xl py-3">
                รายการสินค้า
              </th>
            </tr>
          </thead>
          <tbody>
            {searchResult &&
              searchResult.map((item, index) => (
                <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-2 text-xl font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td class="px-6 py-2 text-xl">{item.autonumber}</td>
                  <td class="px-6 py-2 text-xl">
                    {" "}
                    {item.user && item.user.name}
                  </td>
                  <td class="px-6 py-2 text-xl text-end">
                    {currencyFormat(Number(item.totalPrice))}
                  </td>
                  <td class="px-1 py-2 text-xl text-center">
                    {item.dateOrdered.substring(0, 10)}
                  </td>
                  <td class="px-6 py-2 text-xl">
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

                  <td class="px-6 py-2 text-xl">
                    {item?.status !== "ยกเลิก" ? (
                      <select
                        name="role"
                        required
                        className="block pr-4 mb-1 font-bold text-gray-500 border border-amber-200 md:text-center md:mb-0"
                        onChange={(e) => handleCompany(item._id, e)}
                        value={item?.deliverycompany}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Kerry Express">Kerry Express</option>
                        <option value="Flash express">Flash express</option>
                        <option value="Best express">Best express</option>
                        <option value="ไปรษณีย์">ไปรษณีย์</option>
                      </select>
                    ) : null}
                  </td>

                  <td class="px-6 py-2 text-xl">
                    {item?.status !== "ยกเลิก" ? (
                      <input
                        type="text"
                        placeholder=""
                        name="Noshipping"
                        className="flex w-48 mb-2 border md:text-center"
                        value={item?.Noshipping}
                        onChange={(e) => handleNoShip(item._id, e)}
                      />
                    ) : null}
                  </td>
                  <td class="px-6 py-2 text-xl">
                    <>
                      <button
                        className="px-6 py-3 mb-1 mr-1 text-xl font-bold text-black bg-blue-200 rounded shadow outline-none active:bg-blue-500 hover:shadow-lg focus:outline-none"
                        type="button"
                        onClick={(e) => setShow(item)}
                      >
                        รายการสินค้า
                      </button>
                    </>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderAdmin;

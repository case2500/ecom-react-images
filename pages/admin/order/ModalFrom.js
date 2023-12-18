import React from "react";

const ModalFrom = ({ showModal, setShowModal, datamodal }) => {
  return (
    <div>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center w-full ">
            <div className="w-[750px]">
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 bg-blue-200 border-b border-gray-300 border-solid rounded-t ">
                  <h3 className="text-3xl font=semibold">รายละเอียดสินค้า</h3>
                  <button
                    className="float-right text-black bg-transparent border-0"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="block w-6 h-6 py-0 text-xl text-black bg-gray-400 rounded-full opacity-7">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative flex-auto p-6">
                  {/* First Name{JSON.stringify(datamodal.orderItems[0])} */}
                  <table className="border-spacing-x-4">
                    <thead className="bg-gray-200">
                      <tr className="text-xl text-gray-500 ">
                        <td className="w-16 text-center">ลำดับ</td>
                        <td className="w-64 text-center">ชื่อสินค้า</td>
                        <td className="w-16 text-center">จำนวน</td>
                        <td className="w-64 text-end">ราคาต่อหน่วย</td>
                        <td className="w-64 text-end">รวมราคา</td>
                      </tr>
                    </thead>
                    {datamodal &&
                      datamodal.orderItems.map((pq, index) => (
                        <tbody ame="mt-2 ">
                          <tr className="mt-2 text-xl text-gray-500">
                            <td className="w-16 text-center" key={index}>
                              {index + 1}.
                            </td>
                            <td className="w-64">
                              {pq && pq.product && pq.product.name}
                            </td>
                            <td className="w-16 text-center">
                              {pq && pq.quantity}
                            </td>
                            <td className="w-64 text-right">
                              {pq ? pq.product.price : null}
                            </td>
                            <td className="w-64 text-right">
                              {pq && pq.quantity * (pq && pq.product.price)}
                            </td>
                          </tr>
                        </tbody>
                      ))}

                    <tr>
                      <td className="w-64 text-right"></td>
                      <td className="w-64 text-right"></td>
                      <td className="w-64 text-right"></td>

                      <td className="w-64 text-right"></td>
                      <td className="w-64 text-xl text-right"></td>
                    </tr>

                    <tr>
                      <td className="w-64 text-right"></td>
                      <td className="w-64 text-right"></td>
                      <td className="w-64 text-right"></td>

                      <td className="w-64 text-xl text-right">ยอดรวม</td>
                      <td className="w-64 text-xl text-right">
                        {datamodal.totalPrice}
                      </td>
                    </tr>
                  </table>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                  <button
                    className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase outline-none background-transparent focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>

                  {/* <button
                    className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-yellow-500 rounded shadow outline-none active:bg-yellow-700 hover:shadow-lg focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Submit
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ModalFrom;

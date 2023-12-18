import React from 'react'
import { FaTrash } from "react-icons/fa";
import { ImPencil } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";

const Table = ({currentItems,confirmDelete,currencyFormat}) => {
  return (
    <div className="bg-red-200 ">
        <table className="px-1 py-2 text-sm text-left text-gray-500 bg-blue-200 w-1/8">
        <thead className="text-xs text-gray-700 uppercase ">
          <tr>
            <th className="px-1 py-3 text-xl">No</th>
            <th className="px-10 py-3 text-xl ">รูปภาพ</th>
            <th className="px-20 py-3 max-w[50px] text-xl ">ชื่อ</th>
            <th className="px-1 py-3 text-xl">ราคา</th>
            <th className="px-1 py-3 text-xl">จำนวน</th>
            <th className="px-1 py-3 text-xl">Action</th>
          </tr>
        </thead>
        <tbody >
          {currentItems &&
            currentItems.map((p, index) => (
              <tr className="px-2 bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="w-10 px-1 py-2">{index + 1}</td>
                <td className="w-32 mx-auto text-xl ">
              {/* picture=  {JSON.stringify(p.images[0].filePath)} */}
              {/* src={`http://localhost:4000/${ps.filePath}`} */}
              {/* {`http://localhost:4000/`+(p.images[0].filePath)} */}
                  <img src={`http://localhost:4000/`+(p.images[0].filePath)} className="flex items-center h-24 " />
                </td>
                <td className="w-64 mx-auto text-xl ">{p.name}</td>
                <td className="w-32 px-1 py-2 text-xl ">
                  {currencyFormat(p.price)}
                </td>
                <td className="w-32 px-1 py-2 text-xl ">{p.quantity}</td>
                <td className="px-1 py-2 text-xl w-96">
                  <Link to={"/update-product/" + p._id}>
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      <ImPencil />
                    </button>{" "}
                  </Link>
                  <button
                    onClick={() => confirmDelete(p._id)}
                    className="px-4 py-2 font-semibold text-red-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table

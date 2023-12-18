import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Company from "./Company.js";
import CompanyForm from "./CompanyForm.js";
import {
  getCompany,
  createCompany,
  deleteCompany,
} from "../../../store/company/companySlice.js";
import { FaTrash } from "react-icons/fa";
import { ImPencil } from "react-icons/im";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const AddCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  const { companies } = useSelector((state) => state.company);
  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch, refresh]);

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!" + id,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCompany(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success" + id);
      }
    });
  };

  return (
    <div className="flex flex-row mx-auto">
      <Link to={"/add-company"}>
        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          <ImPencil />
        </button>
      </Link>

      <table className="text-sm text-left text-gray-500 w-1/8 px-96 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-1 py-3 text-xl">No</th>
            <th className="px-10 py-3 text-xl ">รูปภาพ</th>
            <th className="px-20 py-3 max-w[50px] text-xl ">ชื่อร้านค้า</th>
            <th className="px-5 py-3 text-xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {companies&&companies.map((p, index) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="w-10 px-1 py-2 text-xl">{index + 1}</td>
              <td className="w-64 px-10 mx-auto text-xl ">{p.name}</td>
              <td className="w-64 px-10 mx-auto text-xl ">{p.address}</td>
              <td className="w-64 px-10 mx-auto text-xl ">{p.phone}</td>
              <td className="px-1 py-2 text-xl w-96">
                <Link to={"/update-company/" + p._id}>
                <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  <ImPencil />
                </button>
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
  );
};

export default AddCompany;

// formData.append("address", address);
// formData.append("phone", phone);
// formData.append("description", description);

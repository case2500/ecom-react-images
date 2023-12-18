import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { ImPencil } from "react-icons/im";
import { getuserlist } from "../../../store/auth/userSlice.js";
import { changeRole, removeUser } from "./functionusers.js";

const ManageAdmin = () => {
  const dispatch = useDispatch();
  const roleData = ["admin", "user"];
  const authtoken = JSON.parse(localStorage.getItem("token"));
  const [refresh, setrefresh] = useState(false);
  const user = useSelector((state) => state.user);

  const getUSers = async (authtoken) => {
    try {
      await dispatch(getuserlist(authtoken));
    } catch (error) {
      alert(error);
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeUser(id);
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getUSers();
      }
    });
  };

  const handleChangeRole = (e, id) => {
    let values = {
      id: id,
      role: e.target.value,
    };
    changeRole(authtoken, values)
      .then((res) => {
        Swal.fire("update OK");
        console.log(res);
        getUSers();
        setrefresh(!refresh);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getUSers(authtoken);
  }, [dispatch, refresh]);

  return (
    <div className="px-10 py-10 ">
 {/* authtoken  {authtoken } */}
      <div className="px-2 py-2 bg-blue-200">
        <table className="text-sm text-left text-gray-500 w-1/8 px-96 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-blue-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-1 py-3 text-xl">No</th>
              <th className="px-10 py-3 text-xl ">รูปภาพ</th>
              <th className="px-20 py-3 max-w[50px] text-xl ">ชื่อ</th>
              <th className="px-1 py-3 text-xl">ราคา</th>
              <th className="px-1 py-3 text-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {user.users.map((item, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="w-10 px-1 py-2">{index + 1}</td>
                <td className="w-64 mx-auto text-xl ">{item.name}</td>
                <td className="w-32 px-1 py-2 text-xl ">{item.email}</td>
                <td className="w-32 px-1 py-2 text-xl ">{item.role}</td>

                <td className="w-32 px-1 py-2 text-xl ">
                  <select
                    name="role"
                    onChange={(e) => handleChangeRole(e, item._id)}
                    required
                    className="block pr-4 mb-1 font-bold text-gray-500 border border-amber-700 md:text-left md:mb-0"
                    value={item?.role}
                  >
                    <option>Please Select </option>
                    {roleData&&roleData.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="px-1 py-2 text-xl w-96">
                  <Link to={"/update-product/" + item._id}>
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      <ImPencil />
                    </button>{" "}
                  </Link>
                  <button
                    onClick={() => confirmDelete(item._id)}
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
    </div>
  );
};

export default ManageAdmin;

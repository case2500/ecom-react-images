import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompanyForm from "./CompanyForm.js";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";


import {
  selectCompany,
  getCompany,
  updateCompany,
  getSingleCompany,
} from "../../../store/company/companySlice.js";

const EditCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const companyEdit = useSelector(selectCompany);
  const [company, setCompany] = useState(companyEdit[0]);
  const [refresh, setRefresh] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };
  const saveCompany = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", company?.name);
    formData.append("address", company?.address);
    formData.append("phone", company?.phone);
    formData.append("description", company?.description);
    console.log(...formData);
    await dispatch(updateCompany({ id, formData }));
    Swal.fire("Update!", "Your file has been updated.", "success" );
    navigate("/list-company");
  };

  useEffect(() => {
    dispatch(getSingleCompany(id));
  }, [dispatch]);

  return (
    <div className="flex flex-row mx-auto">
      <div className="container w-full mx-16 ">
        {/* {JSON.stringify(company)}
        {company?.address} */}
        {/* {(name)} xx{ address} */}
        <h1 className="text-xl">รายละเอียดร้านค้า</h1>
        <div className="flex">
          <form onSubmit={saveCompany}>
            <label>ชื่อร้านค้า</label>
            <input
              type="text"
              placeholder="ชื่อร้านค้า"
              name="name"
              className="flex p-1 mb-2 border border-gray-400 w-96"
              value={company?.name}
              onChange={handleInputChange}
            />
            <label>ที่อยู่:</label>
            <input
              type="text"
              placeholder="ที่อยู่"
              name="address"
              className="flex p-1 mb-2 border border-gray-400 w-96"
              value={company?.address}
              onChange={handleInputChange}
            />
            <label>เบอร์โทร:</label>
            <input
              type="text"
              placeholder="เบอร์โทร"
              name="phone"
              className="flex p-1 mb-2 border border-gray-400 w-96"
              value={company?.phone}
              onChange={handleInputChange}
            />
            <label>คำอธิบาย:</label>
            <input
              type="text"
              placeholder="คำอธิบาย"
              name="description"
              className="flex p-1 mb-2 border border-gray-400 w-96"
              value={company?.description}
              onChange={handleInputChange}
            />

            <div className="mt-2">
              <button
                type="submit"
                className="px-5 py-2 bg-green-600 rounded-md "
              >
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCompany;

// formData.append("address", address);
// formData.append("phone", phone);
// formData.append("description", description);

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Company from "./Company.js";
import CompanyForm from "./CompanyForm.js";
import {
  selectCompany,
  selectCompanies,
  getCompany,
  createCompany,
} from "../../../store/company/companySlice.js";

const initialState = {
  name: "",
  address: "",
  phone: "",
  image: "",
  description: "",
};

const AddCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [company, setCompany] = useState(initialState);
  const [companyImage, setCompanyImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [refresh, setRefresh] = useState(false);

  const { companies } = useSelector((state) => state.company);
  const { name, description, address, phone } = company;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleImageChange = (e) => {
    setCompanyImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveCompany = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("description", description);
    formData.append("image", companyImage);

    await dispatch(createCompany(formData));
    setRefresh(!refresh);
    window.location.reload();
  };

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch, refresh]);

  return (
    <div className="flex flex-row mx-auto">
      {/* companys:{JSON.stringify(companies)} */}
      <div>
        <CompanyForm
          company={company}
          companyImage={companyImage}
          imagePreview={imagePreview}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          saveCompany={saveCompany}
        />
      </div>
      <div>
        companys:{JSON.stringify(company)}
        {/* <Company companies={companies} /> */}
      </div>
    </div>
  );
};

export default AddCompany;

// formData.append("address", address);
// formData.append("phone", phone);
// formData.append("description", description);

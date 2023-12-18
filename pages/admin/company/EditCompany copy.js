import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Company from "./Company.js";
import CompanyForm from "./CompanyForm.js";
import { useNavigate, useParams } from "react-router-dom";


import {
  selectCompany,
  getCompany,
  updateCompany,
  getSingleCompany
} from "../../../store/company/companySlice.js";

const initialState = {
  name: "",
  address: "",
  phone: "",
  image: "",
  description: "",
};

const EditCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { id } = useParams();
 const companyEdit = useSelector(selectCompany);
  const [categorys, setCategorys] = useState([]);
  const [values, setValues] = useState("");

  // const { companies } = useSelector((state) => state.company.company);

  const [company, setCompany] = useState(companyEdit);
  const [companyImage, setCompanyImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [refresh, setRefresh] = useState(false);


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

    await dispatch(updateCompany(formData));
    setRefresh(!refresh);
    window.location.reload();
  };

  useEffect(() => {
    dispatch(getSingleCompany(id));
  }, [dispatch, refresh]);

  return (
    <div className="flex flex-row mx-auto">

   
    
      {JSON.stringify(companyEdit.company)}
      {/* <div>
      //  {JSON.stringify(companies)}
        <Company companies={companies} />
      </div> */}
   </div>
  );
};

export default EditCompany;

// formData.append("address", address);
// formData.append("phone", phone);
// formData.append("description", description);

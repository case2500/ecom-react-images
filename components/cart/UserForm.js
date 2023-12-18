import React, { useState, useEffect } from "react";
// import { updateuser } from "../services/authService1.js";
import { useDispatch, useSelector } from "react-redux";

import {  updateUser } from "../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const authtoken = JSON.parse(localStorage.getItem("token"))

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const initialState = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    bio: user.bio,
  };
  const navigate = useNavigate();
  const [profile, setProfile] = useState(initialState);

  const saveProfile = async (e) => {
    // e.preventDefault()
    const formData = {
      _id: user.id,
      name: profile.name,
      phone: profile.phone,
      bio: profile.bio,
      email: profile.email,
    };
    try {
      await dispatch(updateUser({authtoken,formData}));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  // const{id,name,bio,phone,} = user
  return (
    <div className="flex mx-auto mt-10 md:justify-center ">
    
      <form
        className="border border-red-500 rounded-md w-[550px]"
      >
        <b className="mx-1"> แก้ไขข้อมูล </b>

        <span className="grid md:px-5 md:grid-cols-2">
          <p className="px-24 mt-2 ">
            <label>Name:</label>
          </p>
          <p className="px-24 mt-2 md:mt-0 md:px-0 ">
            <input
              type="text"
              name="name"
              value={profile?.name}
              className="w-64 p-1 mt-2 border border-red-500 rounded-md bg-gray-50"
              onChange={handleInputChange}
            />
          </p>

          <label className="p-1 px-24 mt-2 md:mt-0 md:px-0">ที่อยู่:</label>
          <p className="px-24 mt-2 md:mt-0 md:px-0 ">
            <textarea
              name="bio"
              value={profile?.bio}
              className="w-64 p-1 mt-2 border border-red-500 rounded-md bg-gray-50 "
              onChange={handleInputChange}
              cols="20"
              rows="5"
            ></textarea>
          </p>
          <p className="p-1 px-24 mt-2">
            <label>Phone:</label>
          </p>
          <p className="px-24 mt-2 md:mt-0 md:px-0">
            {" "}
            <input
              type="text"
              name="phone"
              value={profile?.phone}
              className="w-64 p-1 mt-2 border border-red-500 rounded-md bg-gray-50"
              onChange={handleInputChange}
            />
          </p>

          <p className="p-1 px-24 mt-2">
            <label>Email:</label>
          </p>
          <p className="p-1 px-24 mt-2 md:mt-0 md:px-0">
            <input type="text" name="email" value={profile?.email} disabled />
          </p>
        </span>
        <div className="flex justify-center mx-auto ">
          <button
            className="w-32 p-1 mx-2 my-5 text-white bg-green-500 rounded-md "
            onClick={() => saveProfile()}
          >
            บันทึก
          </button>
        </div>
      </form>
      {/* {JSON.stringify(user)} */}
    </div>
  );
};

export default UserForm;

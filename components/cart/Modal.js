import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, SET_USER } from "../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserForm = ({ getuser }) => {
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
      Swal.fire('เปลื่ยนแปลงที่อยู่สำเร็จ')
      await dispatch(SET_USER(formData));
      await dispatch(updateUser({ authtoken, formData }));
     
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className="flex mx-auto mt-10 md:mx-auto md:justify-center ">
      <form
        className="border border-gray-500 rounded-xs md:max-w-[650px] px-10 max-w-[350px]"
        // onSubmit={saveProfile}
      >
        <b className="pt-5 mx-1"> แก้ไขข้อมูล </b>

        <span className="grid pt-5 md:px-5 ">
          <p className="text-gray-500 md:px-0 ">
            <label>ชื่อ:</label>
          </p>
          <p className="">
            <input
              type="text"
              name="name"
              value={profile?.name}
              className="w-64 p-1 border border-gray-500 bg-gray-50"
              onChange={handleInputChange}
            />
          </p>

          <label className="p-1 text-gray-500 md:mt-0 md:px-0">ที่อยู่:</label>
          <p className=" md:mt-0 md:px-0">
            <textarea
              name="bio"
              value={profile?.bio}
              className="w-64 p-1 border border-gray-500 rounded-xs bg-gray-50 "
              onChange={handleInputChange}
              cols="20"
              rows="5"
            ></textarea>
          </p>
          <p className="p-1 text-gray-500 ">
            <label>Phone:</label>
          </p>
          <p className=" md:mt-0 md:px-0">

            <input
              type="text"
              name="phone"
              value={profile?.phone}
              className="w-64 p-1 border border-gray-500 rounded-xs bg-gray-50"
              onChange={handleInputChange}
            />
          </p>

          <p className="p-1 mt-2 md:px-24">
            <label>Email:</label>
          </p>
          <p className="p-1 mt-2 md:mt-0 md:px-0">
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
    </div>
  );
};

export default UserForm;

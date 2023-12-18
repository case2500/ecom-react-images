import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
const AddressCard = () => {
  const { user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [getuser, setGetUser] = useState(user);

  return (
    <div className="bg-gray-100 md:pb-5 md:my-6">
      <section className="mt-5">
        <button
          className="px-5 py-2 mx-5 mt-5 text-white bg-blue-500 rounded-md md:text-xl"
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          เปลื่ยนแปลงที่อยู่
        </button>

        {showModal ? (
          <Modal
            setShowModal={setShowModal}
            showModal={showModal}
            getuser={getuser}
          />
        ) : null}

        <h1 className="pt-5 mx-5 mb-2 text-gray-500 md:text-2xl">
          ที่อยู่จัดส่ง
        </h1>
      </section>

      <form
        className="border border-gray-200 mx-4 md:mx-32 rounded-md md:max-w-[650px] px-10 max-w-[350px] py-2 "
      >
        <span className="grid md:px-5 pt-5 ">
          <p>
            <label className=" md:mt-0 md:px-5 text-gray-500 md:text-xl">
              ชื่อ:
            </label>
          </p>
          <p className="bg-slate-200 rounded-md py-2 w-56 md:w-96">
            <input
              type="text"
              name="name"
              disabled
              value={getuser?.name}
              className="mx-5 text-black md:text-xl  "
            />
          </p>

          <label className="p-1    md:mt-0 md:px-5 text-gray-500 md:text-xl">
            ที่อยู่:
          </label>
          <p className="  md:mt-0 md:px-0 bg-slate-200 rounded-md py-2 w-56 md:w-96">
            <textarea
              name="bio"
              value={getuser?.bio}
              className="mx-5 text-black md:text-xl  "
              cols="30"
              rows="5"
              disabled
            ></textarea>
          </p>
          <label className="p-1    md:mt-0 md:px-5 text-gray-500 md:text-xl">
            เบอร์โทร:
          </label>
          <p className="bg-slate-200 rounded-md py-2 w-56 md:w-96">
            <input
              type="text"
              name="name"
              value={getuser?.phone}
              className="mx-5 text-black md:text-xl "
              disabled
            />
          </p>

          <label className="p-1    md:mt-0 md:px-5 text-gray-500 md:text-xl">
            Email:
          </label>
          <p className="bg-slate-200 rounded-md py-2 w-56 md:w-96">
            <input
              type="text"
              name="name"
              value={getuser?.email}
              className="mx-5 text-black md:text-xl  "
              disabled
            />
          </p>
        </span>
      </form>

      {/* <div className="mx-5 md:text-3xl ">
        <b>{getuser?.name} </b>
      </div>
      <div className="mx-5 text-gray-400 md:text-2xl ">
        ที่อยู่ : {getuser?.bio}
      </div>
      <div className="mx-5 text-gray-400 md:text-2xl">
        เบอร์โทร : {getuser?.phone}
      </div>
      <div className="mx-5 text-gray-400 md:text-2xl">
        Email : {getuser?.email}
      </div> */}
    </div>
  );
};

export default AddressCard;

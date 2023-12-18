import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../../../URL.js";
import FileUpload from "./FileUpload";

import {
  getProduct,
  getProducts,
  selectProduct,
  updateProduct,
} from "../../../store/product/productSlice.js";

const initialstate = {
  name: "",
  category: "",
  price: "",
  phone: "",
  quantity: "",
  discount: "",
  brand: "",
  description: "",
  images: [],
};

const authtoken = JSON.parse(localStorage.getItem("token"));

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productEdit = useSelector(selectProduct);
  const [categorys, setCategorys] = useState([]);
  const [values, setValues] = useState(productEdit);
  const [multipleProgress, setMultipleProgress] = useState(0);
  const [multipleFiles, setMultipleFiles] = useState("");

  const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);

  const LoadCatergory = async () => {
    const loadcategory = await axios.get(`${URL}category`);
    setCategorys(loadcategory.data);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(updateProduct({ authtoken, id, values }));
    await dispatch(getProducts());
    navigate("/admin");
  };

  const changeHandler = (e) => {
    const { files } = e.target;
    setMultipleFiles(e.target.files);
    const validImageFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match(imageTypeRegex)) {
        validImageFiles.push(file);
      }
    }
    if (validImageFiles.length) {
      setImageFiles(validImageFiles);
      return;
    }
    alert("Selected images are not of valid type!");
  };

  useEffect(() => {
    dispatch(getProduct(id));
    LoadCatergory();
  }, [dispatch, id]);
  useEffect(() => {
    setValues(productEdit);
  }, [productEdit]);

  return (
    <div className="w-[1024px]">
      <div className="grid grid-cols-1 bg-blue-200 gap-9 ">
        <div className="flex flex-col gap-1">
          <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="px-4 py-4 bg-blue-200 border-b border-stroke dark:border-strokedark">
              <h3 className="font-semibold text-black dark:text-white">
                เพิ่มรายการ
                {/* {JSON.stringify(values)} */}
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row px-5  mt-4">
                  <div className="w-full xl:w-1/2">
                    <section className="block text-xl text-black dark:text-white">
                      ชื่อ
                    </section>
                    <input
                      type="text"
                      name="name"
                      value={values?.name}
                      onChange={handleChange}
                      placeholder="ชื่อ"
                      className="w-full bg-gray-200 rounded border-[1.5px] text-xl py-3 px-5   "
                    />
                  </div>
                </div>

                <div className="mb-4.5 px-5 mt-4">
                  <label className="block text-xl text-black dark:text-white">
                    ราคา <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={values?.price}
                    onChange={handleChange}
                    placeholder=""
                    className="w-64 bg-gray-200 text-xl rounded text-center border-[1.5px] py-1 px-5  "
                  />{" "}
                  บาท
                </div>

                <div className="mb-4.5 px-5 mt-4">
                  <label className="block text-xl text-black dark:text-white">
                    จำนวน <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={values?.quantity}
                    onChange={handleChange}
                    placeholder=""
                    className="w-64 bg-gray-200 text-xl rounded text-center border-[1.5px] py-1 px-5  "
                  />
                </div>

                <div className="mb-4.5 px-5 mt-4">
                  <label className="block text-xl text-black dark:text-white">
                    แบรนด์
                    <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="brand"
                    placeholder="ถนนหรือตำแหน่งใกล้เคียง"
                    onChange={handleChange}
                    className="w-64  rounded text-xl border-[1.5px]  py-1 px-5 bg-gray-200 "
                    value={values?.brand}
                  />
                </div>

                <div className="mb-4.5 px-5 mt-4">
                  <label className="block text-xl text-black dark:text-white">
                    ลดราคา
                    <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="discount"
                    placeholder="discount"
                    onChange={handleChange}
                    className="w-64  rounded text-xl border-[1.5px]  py-1 px-5 bg-gray-200 "
                    value={values?.discount}
                  />
                </div>

                <div className="mb-4.5 px-5">
                  <label className="block mt-4 mb-1 text-xl text-black dark:text-white">
                    หมวดหมู่สินค้า
                  </label>
                  <div className="relative z-20 text-xl ">
                    <select
                      className="py-2 bg-gray-100 bg-gray-200 w-96 "
                      name="category"
                      onChange={handleChange}
                      value={values?.category}
                      required
                    >
                      <option>กรุณาเลือกหมวดหมู่สินค้า</option>
                      {categorys.length > 0 &&
                        categorys.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                {/* เลือกรูป */}
                <div className="mt-5 ml-5 text-xl text-gray-300">
                  <form>
                    <label htmlFor="file">เลือกรูป</label>
                    <p>
                      <input
                        type="file"
                        id="file"
                        onChange={changeHandler}
                        accept="image/png, image/jpg, image/jpeg"
                        multiple
                      />
                    </p>
                  </form>
                </div>
                {/* <FileUpload
                  values={values}
                  setValues={setValues}
                  // loading={loading}
                  // setLoading={setLoading}
                /> */}

                <div className="px-5 mt-4 mb-6">
                  <label className="block text-xl text-black dark:text-white">
                    รายละเอียด
                  </label>
                  <textarea
                    rows={6}
                    placeholder="คำอธิบาย"
                    className="w-full text-xl rounded border-[1.5px] border-stroke bg-gray-200 py-3 px-5 font-medium   "
                    type="text"
                    name="description"
                    value={values?.description}
                    onChange={handleChange}
                  />
                </div>
                <button className="flex justify-center w-32 p-3 mx-5 my-2 text-xl font-medium text-white bg-green-600 rounded">
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

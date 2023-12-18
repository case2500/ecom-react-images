import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm.js";
import { createProduct } from "../../../store/product/productSlice.js";
import FileUpload from "./FileUpload";
import Swal from "sweetalert2";
import axios from "axios";
import { URL } from "../../../URL.js";
import FileUploadScreen from "./screens/FileUploadScreen.js";

const authtoken = JSON.parse(localStorage.getItem("token"));
const initialstate = {
  name: "",
  category: "",
  price: "",
  phone: "",
  quantity: "",
  discount: "",
  brand: "",
  categories: [],
  description: "",
  images: [],
};

const AddProduct = () => {
  const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);

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
    const images = [],
      fileReaders = [];
    let isCancel = false;
    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result);
          }
          if (images.length === imageFiles.length && !isCancel) {
            setImages(images);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
    return () => {
      isCancel = true;
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [imageFiles]);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [categorys, setCategorys] = useState([]);
  const [values, setValues] = useState("");

  const [multipleFiles, setMultipleFiles] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [multipleProgress, setMultipleProgress] = useState(0);
  const [description, setDescription] = useState("");

  const LoadCatergory = async () => {
    const loadcategory = await axios.get(`${URL}category`);
    setCategorys(loadcategory.data);
  };
  useEffect(() => {
    LoadCatergory();
  }, []);

  // const handleChange = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };

  const saveProduct = async (e) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("brand", brand);
    formData.append("discount", discount);
    formData.append("category", category);
    formData.append("description", description);
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
    }
    await dispatch(createProduct({ authtoken, formData }));
  };
  const PictureFileChange = (e) => {
    setValues(e);
    setMultipleFiles(e.target.files);
  };
  return (
    <div className="w-[1024px]">
      <div className="row mt-3">
        <div className="col-6">
          <div className="row">{/* {JSON.stringify(categorys)} */}</div>
        </div>
        <div className="col-6">
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row px-5  mt-4">
              <div className="w-full xl:w-1/2">
                <section className="block text-xl text-gray-300 ">
                  ชื่อสินค้า 134
                </section>
                <input
                  type="text"
                  name="name"
                  // value={values.name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ชื่อ"
                  className="w-full bg-gray-200 rounded border-[1.5px]  py-3 px-5 text-xl  "
                />
              </div>
            </div>

            <div className="mb-4.5 px-5 mt-4">
              <label className="block text-xl text-gray-300 ">ราคา</label>
              <input
                type="number"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                placeholder=""
                className="w-64 bg-gray-200 text-xl rounded text-center border-[1.5px] py-1 px-5  "
              />{" "}
              บาท
            </div>

            <div className="mb-4.5 px-5 mt-4">
              <label className="block text-xl text-gray-300 ">จำนวน</label>
              <input
                type="number"
                name="quantity"
                onChange={(e) => setQuantity(e.target.value)}
                placeholder=""
                className="w-64 bg-gray-200 text-xl rounded text-center border-[1.5px] py-1 px-5  "
              />
            </div>

            <div className="mb-4.5 px-5 mt-4">
              <label className="block text-xl text-gray-300 ">แบรนด์</label>
              <input
                type="text"
                name="brand"
                placeholder=""
                onChange={(e) => setBrand(e.target.value)}
                className="w-64  rounded text-xl border-[1.5px]  py-1 px-5 bg-gray-200 "
              />
            </div>

            <div className="mb-4.5 px-5 mt-4">
              <label className="block text-xl text-gray-300 ">ลดราคา</label>
              <input
                type="text"
                name="discount"
                placeholder=""
                onChange={(e) => setDiscount(e.target.value)}
                className="w-64  rounded text-xl border-[1.5px]  py-1 px-5 bg-gray-200  "
              />
            </div>

            <div className="mb-4.5 px-5">
              <label className="block mt-4 mb-1 text-xl text-gray-300 ">
                หมวดหมู่สินค้า
              </label>
              <div className="relative z-20 text-xl ">
                <select
                  className="py-2 bg-gray-100 w-96 "
                  name="category"
                  onChange={(e) => setCategory(e.target.value)}
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

            {images.length > 0 ? (
              <div>
                {images.map((image, idx) => {
                  return (
                    <p key={idx}>
                      {" "}
                      <img src={image} alt="" />{" "}
                    </p>
                  );
                })}
              </div>
            ) : null}

            {/* <div>
              <div className="form-group">
                <label>เลือกรูป</label>
                <input
                  type="file"
                  values={values}
                  onChange={(e) => PictureFileChange(e)}
                  className="form-control"
                  multiple
                />
              </div>
            </div> */}

            {/* <div className="container">
              <h3 className="text-center text-danger font-weight-bolder border-bottom">
                VDO Upload
              </h3>
              <FileUploadScreen />
            </div> */}

            <div className="px-5 mt-4 mb-6">
              <label className="block text-xl text-gray-300 ">รายละเอียด</label>
              <textarea
                rows={6}
                placeholder="คำอธิบาย"
                className="w-full text-xl rounded border-[1.5px] border-stroke bg-gray-200 py-3 px-5 font-medium   "
                type="text"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button
              className="flex justify-center w-32 p-3 mx-5 my-2 text-xl font-medium text-white bg-green-600 rounded"
              onClick={(e) => saveProduct(e)}
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

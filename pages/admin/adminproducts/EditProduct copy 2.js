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
  const [loading, setLoading] = useState(false);
  const [categorys, setCategorys] = useState([]);
  const [values, setValues] = useState("");

  const productEdit = useSelector(selectProduct);

  const [multipleFiles, setMultipleFiles] = useState("");
  // const [name, setName] = useState("");
  // const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  // const [brand, setBrand] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [multipleProgress, setMultipleProgress] = useState(0);
  // const [description, setDescription] = useState("");

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
  // const { images } = productEdit;
  // const changeHandler = (e) => {
  //   const { files } = e.target;
  //   setMultipleFiles(e.target.files);
  //   const validImageFiles = [];
  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     if (file.type.match(imageTypeRegex)) {
  //       validImageFiles.push(file);
  //     }
  //   }
  //   if (validImageFiles.length) {
  //     setImageFiles(validImageFiles);
  //     return;
  //   }
  //   alert("Selected images are not of valid type!");
  // };

  const {  name, price, description, sold, brand } = values;
  const getproducts = async (id) => {
    try {
      const response = await axios.get(`${URL}product/` + id);
      // alert(JSON.stringify(response.data));
      setValues(response.data);
    } catch (error) {
      alert(error);
    }
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
    getproducts(id);
    // setValues(productEdit);
  }, [values,id]);



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


  return (
    <div className="w-[1024px]">
      <div className="row mt-3">
        <div className="col-6">
          {/* <div className="row">{JSON.stringify(values)}</div> */}
{/* {name}
{JSON.stringify(images)} */}
{images?.map(p =>{
  return (
    <li>
      {p.fileName}
        <img
                src={`http://localhost:4000/${p.filePath}`}
                className="object-contain w-32 h-32"
              /> 
      {p.filePath}
    </li>
  )
})}
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
                  value={values?.name}
                  // onChange={(e) => setName(e.target.value)}
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
                value={values?.price}
                // onChange={(e) => setPrice(e.target.value)}
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
                value={values?.quantity}
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
                value={values?.brand}
                // onChange={(e) => setBrand(e.target.value)}
                className="w-64  rounded text-xl border-[1.5px]  py-1 px-5 bg-gray-200 "
              />
            </div>
            <div className="mb-4.5 px-5 mt-4">
              <label className="block text-xl text-gray-300 ">ลดราคา</label>
              <input
                type="text"
                name="discount"
                placeholder=""
                value={values?.discount}
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
                  value={values?.category}
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
            {/* {JSON.stringify(values?.images)} */}
            เลือกรูป
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

        
              <div>{JSON.stringify(imageFiles)}
                {images?.map((image, idx) => {
                  return (
                    <p key={idx}>
                      
                      <img src={imageFiles} alt="" />{" "}
                    </p>
                  );
                })}
              </div>
          

            {/* <img
                src={`http://localhost:4000/${values.images[0].filePath}`}
                className="object-contain w-full h-full"
              /> */}
            {/* {(values?.images[0])} */}
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
                // onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button
              className="flex justify-center w-32 p-3 mx-5 my-2 text-xl font-medium text-white bg-green-600 rounded"
              // onClick={(e) => saveProduct(e)}
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

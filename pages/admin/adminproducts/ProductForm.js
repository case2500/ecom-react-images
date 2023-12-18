import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import FileUpload from "./FileUpload.js";

const initialstate = {
  title: "",
  description: "",
  categories: [],
  category: "",
  price: "",
  quantity: "",
  images: [],
};

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
  categorys,
}) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialstate);

  function selectImage(e) {
    const { files } = e.target;
    let images = [];
    const selecteds = [...[...files]];
    selecteds.forEach((i) => images.push(URL.createObjectURL(i)));
    setImagePreview(images);
    handleImageChange(e);
  }
  const [imagepreview, setImagePreview] = useState([]);

  return (
    <div className="container w-full px-5 py-5 bg-gray-100 ">
      <h1 className="flex justify-center py-2 mb-5 text-4xl text-black bg-blue-100 rounded-md">
        เพิ่มสินค้า
      </h1>
      <div className="flex md:text-xl lg:text-xl">
        <form onSubmit={saveProduct}>
          <label className=" md:text-2xl lg:text-2xl">
            ชื่อสินค้า{" "}
            <input
              type="text"
              placeholder=""
              name="name"
              className="flex p-1 mb-2 border border-gray-400 w-96"
              value={product?.name}
              onChange={handleInputChange}
            />{" "}
          </label>
          <label className=" md:text-2xl lg:text-2xl">
            ราคา
            <input
              type="number"
              placeholder=""
              name="price"
              value={product?.price}
              onChange={handleInputChange}
              className="flex p-1 mb-2 border border-gray-400"
            />
          </label>
          <div className="w-96">
            <label className=" md:text-2xl lg:text-2xl">กลุ่มสินค้า</label>
          </div>
          <div className="mb-2 md:w-1/3 md:items-start">
            <select
              name="category"
              onChange={handleInputChange}
              value={product?.category}
              required
              className="flex p-1 mb-2 font-bold text-gray-500 border border-amber-700 md:text-left md:mb-0"
            >
              <option>เลือกกลุ่มสินค้า</option>
              {categorys.length > 0 &&
                categorys.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          <label className=" md:text-2xl lg:text-2xl">ยี่ห้อ </label>
          <input
            type="text"
            placeholder=""
            name="brand"
            value={product?.brand}
            onChange={handleInputChange}
            className="flex p-1 mb-2 border border-gray-400"
          />
          <label className=" md:text-2xl lg:text-2xl">ส่วนลด</label>
          <input
            type="number"
            placeholder=""
            name="discount"
            value={product?.discount}
            onChange={handleInputChange}
            className="flex p-1 mb-2 border border-gray-400"
          />

          <label className=" md:text-2xl lg:text-2xl">จำนวน</label>
          <input
            type="number"
            placeholder=""
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
            className="flex p-1 mb-2 border border-gray-400"
          />

          <FileUpload
            values={values}
             setValues={setValues}
            // loading={loading}
            // setLoading={setLoading}
          />

          <div>
            {/* <input type="file" accept="image/*" multiple onChange={selectImage} /> */}
            {imagepreview.map((i) => (
              <img key={i} src={i} style={{ height: 300 }} alt="" />
            ))}

            <input type="file" name="image" onChange={selectImage} />
            {/* imagePreview : {imagePreview} */}
            {/* <img src={imagePreview} alt="product" /> */}
            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <p>Supported Formats: jpg, jpeg, png</p>
            )}
          </div>

          <label className=" md:text-2xl lg:text-2xl">ข้อความอธิบาย</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className="mt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-green-600 rounded-md "
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;

import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  desc,
  setDesc,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  const dispatch = useDispatch();
  // const { categorys } = useSelector((state) => state.category);

  return (
    <div className="w-full ">
      <h1 className="flex justify-center py-2 mb-5 text-4xl text-black bg-gray-200">
        เพิ่มsilder
      </h1>
      <div className="flex md:text-xl lg:text-xl">
        <form onSubmit={saveProduct}>
          <label className="text-red-400 md:text-2xl lg:text-2xl">title </label>
          <input
            type="text"
            placeholder=""
            name="title"
            className="flex p-1 mb-2 border border-gray-400 w-96"
            value={product?.title}
            onChange={handleInputChange}
          />

          <label className="text-red-600 md:text-2xl lg:text-2xl">
            ข้อความอธิบาย
          </label>
          <div>
            <input
              type="text"
              placeholder=""
              name="desc"
              className="flex p-1 mb-2 border border-gray-400 w-96"
              value={product?.desc}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <div className="mt-5 text-md">
              Supported Formats: jpg, jpeg, png
            </div>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="my-2 ">
                <img
                  src={imagePreview}
                  alt="product"
                  className="cover-fill max-w-[100px] max-h-[100px] "
                />
              </div>
            ) : (
              <p className="my-10">No image set for this poduct.</p>
            )}
          </div>

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

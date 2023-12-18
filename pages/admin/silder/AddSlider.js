import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SilderForm from "../../admin/silder/SilderForm";

import {
  createSilder,
  getSilders,
  deleteSilder,
} from "../../../store/silder/Silder";

import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { ImPencil } from "react-icons/im";

const text_token = localStorage.getItem("token");
const authtoken = JSON.parse(text_token);

const initialState = {
  title: "",
  desc: "",
};

const AddSilder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const { silder } = useSelector((state) => state.silder);

  const { title, desc } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const remove = (id) => {
    //alert(id);
    dispatch(deleteSilder({ authtoken, id }));
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    dispatch(getSilders());
  }, [dispatch]);

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("image", productImage);
    await dispatch(createSilder({ authtoken, formData }));
    Swal.fire("บันทึก!", "success");
    window.location.reload();
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex-1">
        <SilderForm
          product={product}
          productImage={productImage}
          imagePreview={imagePreview}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          saveProduct={saveProduct}
        />
      </div>
      <div className="">
        {silder.map((p) => (
          <div>
            <div>{p.title}</div>
            <div>
              {p.desc}{" "}
              <button
                onClick={() => {
                  remove(p._id);
                }}
                className="px-4 py-2 mb-2 font-semibold text-red-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"
              >
                <FaTrash />
              </button>
            </div>
            <div>
              <img src={p.cover.filePath} className="h-32 mb-5" />
            </div>

            <div>
              {/* <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                <ImPencil />
              </button>{" "} */}
            </div>
            <hr></hr>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddSilder;

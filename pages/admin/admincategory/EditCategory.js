import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "./CategoryForm";
import {
  getCategory,
  selectCategory,
  getCategories,
  updateCategory,
} from "../../../store/category/categorySlice.js";

const EditCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryEdit = useSelector(selectCategory);
  const [category, setCategory] = useState(categoryEdit);
  const [categoryImage, setCategoryImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    dispatch(getCategory(id));
  }, [dispatch, id]);

  useEffect(() => {
    setCategory(categoryEdit);
    setImagePreview(
      categoryEdit && categoryEdit.image
        ? `${categoryEdit.image.filePath}`
        : null
    );
  }, [categoryEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleImageChange = (e) => {
    setCategoryImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveCategory = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", category?.name);
    if (categoryImage) {
      formData.append("image", categoryImage);
    }
    console.log(...formData);
    await dispatch(updateCategory({ id, formData }));
    await dispatch(getCategories());
    navigate("/create-category");
  };

  return (
    <div className="flex flex-row w-4/5 ">
      {/* {JSON.stringify(category)} */}
      <div className="w-4/5 ">
        <CategoryForm
          category={category}
          categoryImage={categoryImage}
          imagePreview={imagePreview}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          saveCategory={saveCategory}
        />
      </div>
    </div>
  );
};

export default EditCategory;

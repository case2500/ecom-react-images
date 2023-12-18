import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import axios from "axios";
import { URL } from "../../URL.js";
import ProductImages from "./ProductImages.js";

const ProductDetail = ({ match }) => {
  const { id } = useParams();
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [samecategory, setSamecategory] = useState("");
  const [product, setProduct] = useState("");
  const [main, setMain] = useState("");
  useEffect(() => {
    getP(id);
  }, [dispatch, id, match]);

  useEffect(() => {
    getproducts(categoryId);
  }, []);

  const getP = async (id) => {
    try {
      const response = await axios.get(`${URL}product/` + id);
      setProduct(response.data);
    } catch (error) {
      alert(error);
    }
  };

  function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const getproducts = async (categoryId) => {
    try {
      const response = await axios.get(`${URL}product/category/${categoryId}`);
      // alert(JSON.stringify(response.data));
      setSamecategory(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const { images, name, price, description, sold, brand } = product;

  return (
    <div className="md:w-[1200px]  md:h-[800px] md:mx-auto md:my-5  lg:w-[1200px]  lg:h-[800px] lg:mx-auto lg:my-5">
      <div className="md:w-full md:mx-auto lg:w-full lg:mx-auto">
        <ProductImages
          images={images}
          name={name}
          price={price}
          description={description}
          sold={sold}
          brand={brand}
          product={product}
          quantity={quantity}
          // addToCart={addToCart}
        />
      </div>

      <hr></hr>
      <div className="px-5 mt-5">
        <b>สินค้าคล้ายกัน</b>{" "}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4  md:w-[750px]  lg:grid-cols-4  lg:w-[750px] ">
        {samecategory &&
          samecategory.map((samecat) => (
            <div>
              <Link to={`/productdetail/${samecat._id}/${samecat.category}`}>
                <div className="">
                  <img
                    src={samecat.images ? samecat.images[0]?.url : ""}
                    className="object-contain h-32 px-2 md:h-32"
                  />
                </div>
              </Link>
              <div className="text-center">{samecat.name}</div>

              <hr></hr>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductDetail;

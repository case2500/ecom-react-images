import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Brandlist from "./brandlist.js";
import ProductCategoryList from "./productcategorylist.js";
import { URL } from "../../URL.js";
import Swal from "sweetalert2";

const ProductฺByName = ({ match }) => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const { nameCat } = useParams();


  const [AllFilteredProducts, setAllFilteredProducts] = useState([]);
  const [resultfilter, setResultfilter] = useState([]);
  const [reminder, setReminder] = useState(false);
  const [brand, setBrand] = useState("");

  const getproducts = async (keyword) => {
    try {
      const response = await axios.get(
        `${URL}product/productsearch/${keyword}`
      );
      setAllFilteredProducts(response.data);
      setResultfilter(response.data);
      setBrand([]);
    } catch (error) {
      // alert(error);
      Swal.fire(error);
    }
  };

  useEffect(() => {
    getproducts(keyword);
  }, [keyword]);

  const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type]);
    return [...new Set(unique)];
  };

  const brands = getUniqueValues(AllFilteredProducts, "brand");

  const reset = async () => {
    setReminder(!reminder);
  };
  return (
    <div>
      <div className="container mx-auto mt-5 text-xl text-center bg-white">
        <Link to="/">
          <b>{"Home"} </b>
        </Link>
        {">"}
        {keyword}
      </div>
      <div className="bg-gray-100 md:mt-5">
        <div className="container mx-auto mt-5 bg-red-100">
          <div className="mt-16">
            <ProductCategoryList
              resultfilter={resultfilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductฺByName;

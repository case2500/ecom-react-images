import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Brandlist from "./brandlist.js";
import ProductCategoryList from "./productcategorylist.js";
import { URL } from "../../URL.js";


const ProductฺBYCategory = ({ match }) => {
  const dispatch = useDispatch();
  const { categoryfind } = useParams();
  const { nameCat } = useParams();

  const [AllFilteredProducts, setAllFilteredProducts] = useState([]);
  const [resultfilter, setResultfilter] = useState([]);
  const [reminder, setReminder] = useState(false);
  const [brand, setBrand] = useState([]);

  const getproducts = async (categoryfind) => {
    const response = await axios.get(`${URL}product/category/${categoryfind}`);
    setAllFilteredProducts(response.data);
    setResultfilter(response.data);
    setBrand([]);
  };

  useEffect(() => {
    getproducts(categoryfind);
  }, [categoryfind, reminder]);

  useEffect(() => {
    if (brand) loadFilter();
  }, [brand]);

  const loadFilter = async () => {
    try {
      const { data } = await axios.post(`${URL}product/filterproduct`, {
        brand,
        categoryfind,
      });
      setResultfilter(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type]);
    // if (type === "colors") {
    //   unique = unique.flat();
    // }
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
        {nameCat}
      </div>
      <div className="bg-gray-100 md:mt-5">
        <div className="flex flex-col md:flex-row md:mt-5 ">
          <div className="flex md:flex-row md:mt-2 ">
            <Brandlist
              brands={brands}
              brand={brand}
              reset={reset}
              setBrand={setBrand}
              nameCat={nameCat}
            />
          </div>
          {/* {JSON.stringify(resultfilter)} */}
          <div className="md:mt-5">
            <ProductCategoryList
              resultfilter={resultfilter}
              nameCat={nameCat}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductฺBYCategory;

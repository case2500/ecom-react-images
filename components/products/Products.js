import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Products = () => {
  //   console.log(data);
  const dispatch = useDispatch();
  const  products = useSelector((state) => state.product);
  const Psort = products.products.slice().sort((a, b) => a.createdAt - b.createdAt);

  function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

 const shortenText = (text, n) => {
  if (text.length > n) {
    const shortenedText = text.substring(0, n).concat("...");
    return shortenedText;
  }
  return text;
};

useEffect(() => {
  AOS.init({
    easing: "ease-out-back",
    duration: 1000,
    anchorPlacement: "top-bottom",
  });
  AOS.refresh();
}, []);


  return (
    <div className="w-full m-auto px-4 py-1 bg-gray-100/50 mt-10">
      <h1 className="lg:text-xl font-bold text-center ">
        รายการสินค้า
      </h1>
      {/* {JSON.stringify(products.products)} */}
      {/* Display products */}
      <div className="grid  grid-cols-2 md:grid-cols-5  gap-2 py-4 lg:grid-cols-5">
        {products.products.map((p, index) => (
             <Link to={`/productdetail/${p._id}/${p.category}`}>
             <div
               key={index}
               className="duration-300 border rounded-lg shadow-lg  cursor-pointer hover:scale-105"
             
             >
               <div className="mb-4 lg:pt-5 lg:pb-2">
               {/* {"http://localhost:4000/public/uploads/"+p.images[0].filePath} */}
               {/* src={`http://localhost:8080/${file.filePath}`} */}
               {/* {JSON.stringify(p.images)} */}
               {(p.images).slice(0,1).map(ps =>(
                <>
                 {/* x: {ps.fileName} */}
                         <img
                 
                   src={`http://localhost:4000/${ps.filePath}`}
                   alt={p.name}
                   className="object-cover  h-48 mx-auto  "  data-aos="fade-up"
                 />
                </>
               ))}
                 {/* <img
                 
                   src={`http://localhost:4000/${p.images[0].filePath}`}
                   alt={p.name}
                   className="object-cover  h-48 mx-auto  "  data-aos="fade-up"
                 /> */}
               </div>
 
               <div>
               <p className="mx-2 lg:mt-2  text-center    lg:h-10 text-gray-600">
                   {shortenText(p.name, 40)}
                 </p>
               </div>
               <div className="flex justify-center pb-2   px-6 lg:pb-4 lg:px-2">
                 <p>
                   <span className="px-8 py-2 font-semibold text-center text-orange-500 bg-gray-200 rounded-md ">
                     <span className="text-md ">฿</span>
                     <span className="text-2xl">{currencyFormat(p.price)} </span>
                   </span>
                 </p>
               </div>
             </div>
           </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;

import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";


export default function NewProduct({ products }) {
  function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
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
    <div className="w-full px-4 py-4 m-auto mt-5 bg-gray-100/50">
      <h1 className="font-bold text-center md:text-4xl lg:text-xl">
        สินค้าใหม่
      </h1>
      {/* Display New Product */}
      <div className="grid grid-cols-1 gap-1 pt-2 md:grid-cols-5 lg:grid-cols-5 ">
        {products.map((p, index) => (
          <Link to={`/productdetail/${p._id}/${p.category}`}>
            <div
              key={index}
              className="duration-300 border rounded-lg shadow-lg cursor-pointer hover:scale-105"
            
            >
              <div className="mb-4 lg:pt-5 lg:pb-2">
           {/* {`http://localhost:4000/${p.images[0].filePath}`} */}
                <img
                  src=    {`http://localhost:4000/${p.images[0].filePath}`}
                  alt={p.name}
                  className="object-cover h-48 mx-auto "  data-aos="fade-up"
                />
              </div>

              <div>
                <p className="mx-2 text-center text-gray-600 lg:mt-2 lg:h-10">
                  {shortenText(p.name, 40)}
                </p>
              </div>
              <div className="flex justify-center px-6 pb-2 lg:pb-4 lg:px-2">
                <p>
                  <span className="px-8 font-semibold text-center text-orange-500 bg-gray-200 rounded-md lg:py-2 ">
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
}

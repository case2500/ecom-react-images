import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Product({ products }) {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-back",
      duration: 200,
      anchorPlacement: "top-bottom",
    });
    AOS.refresh();
  }, []);

  function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const productFilter = products.filter((p) => p.discount > 0);
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  return (
    <div className="w-full m-auto px-4 py-4 ">
      <p
        className="md:text-4xl lg:text-4xl font-bold text-center text-orange-600 "
        data-aos="fade-left"
      >
        Flash Sale
      </p>

      {/* Display New Product */}
      <div className="grid gap-1 grid-cols-2 pt-2 md:grid-cols-5 lg:grid-cols-5   rounded-lg  ">
        {productFilter.map((p, index) => (
          // <Link to={`/productdetail/${p._id}`}>
          <div className="bg-white cursor-pointer hover:scale-105 shadow-orange-lg">
            <Link to={`/productdetail/${p._id}/${p.category}`}>
              <div
                key={index}
                className="duration-300 rounded-lg cursor-pointer hover:scale-105 px-3 py-3 "
                data-aos="fade-up"
              >
                <p
                  className="absolute px-2 py-1 mx-1 text-white bg-red-400 rounded-md text-md mt-7 z-999 "
                  // data-aos="fade-up"
                >
                  {"Flash Sale"}
                </p>
                {p.images.slice(0, 1).map((ps) => (
                  <>
                    {/* x: {ps.fileName} */}
                    <img
                      src={`http://localhost:4000/${ps.filePath}`}
                      alt={p.name}
                      className="object-cover  h-48 mx-auto  "
                      data-aos="fade-up"
                    />
                  </>
                ))}
                <div>
                  <p className="mx-2 lg:mt-2  text-center    lg:h-6 text-gray-600">
                    {shortenText(p.name, 40)}
                  </p>
                </div>
                <div className="flex justify-center px-6 lg:py-4 md:px-2">
                  <p>
                    <span className="px-8 py-1 font-semibold text-center text-orange-500 bg-gray-100 rounded-md ">
                      <span className="text-md ">฿</span>
                      <span className="text-2xl">
                        {currencyFormat(p.price)}{" "}
                      </span>
                    </span>
                  </p>
                </div>
              </div>
              <hr></hr>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

const Brandlist = ({ brands, reset, brand, setBrand, nameCat }) => {
  return (
    <div>
      <div className="px-10 mb-5 bg-white border-black rounded-md md:mx-5 md:py-5 md:mt-4 md:ml-20 w-96 md:h-screen lg:h-screen xl:h-screen ">
        <h1 className="px-5 py-2 mb-2 text-red-500 bg-gray-300 border-b-2 border-gray-400">
          <b>
        <Link to='/'> <b>{"Home"} </b> </Link> {" > " }{nameCat} {"->"}
            {brand}
          </b>
        </h1>
        <div
          onClick={() => {
            reset();
          }}
        >
          <div className="mb-2 border-b-2 border-gray-400"> All </div>
        </div>
        {brands.map((brand, index) => {
          return (
            <ul>
              <li
                key={index}
                onClick={(e) => {
                  setBrand(`${brand}`);
                }}
              >
                <div className="mb-2 border-b-2 border-gray-400">
                  {brand}
                  <hr></hr>
                </div>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Brandlist;

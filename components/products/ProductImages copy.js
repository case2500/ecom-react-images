import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/cart/cartSlice.js";

const ProductImages = ({
  images = [[]],
  name,
  price,
  description,
  sold,
  brand,
  product,
  quantity,
}) => {
  const [main, setMain] = useState(images[0]);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(images[0].filePath);
  // const [selectedImageSize, setSelectedImageSize] = useState(selectedProduct.pictures[0].size)

  // const [selectedImageSize, setSelectedImageSize] = useState(images[0].size)
  // const regex = /-O/i
  // const [selectedImageFull, setSelectedImageFull] = useState(images[0].replace(regex, '-F'))

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  const handleMouseEnter = (id) => {
    alert(id);
    const idPicture = images.find((images) => images.filePath === id);
    setSelectedImage(idPicture);
  };
  useEffect(() => {
    // setSelectedImageSize(images[0].size.split('x'))
    // setSelectedImageFull(images[0].replace(regex, '-F'))
  }, [selectedImage]);
  return (
    <div>
      <div className="grid md:grid-cols-5 lg:grid-cols-5">
        {JSON.stringify(selectedImage)}

        <div className="w-32 flex flex-col gap-6 ml-16">
          {images.slice(0, 7).map((picture) => (
            <div
              onMouseEnter={() => handleMouseEnter(picture.filePath)}
              key={picture.id}
              // className={
              //   picture.filePath !== selectedImage.picture.filePath
              //     ? "w-11 h-11 outline outline-1 outline-gray-300 rounded-sm"
              //     : "w-11 h-11 outline outline-2 outline-blue-400 rounded-sm"
              // }
            >
              {/* {`http://localhost:4000/${picture.filePath}`} */}
              <img
                src={`http://localhost:4000/${picture.filePath}`}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>

        <div>
          {!images.filePath ? (
            images.slice(0, 1).map((image, index) => {
              return (
                <div key={index}>
                {/* {`http://localhost:4000/${selectedImage.filePath}`} */}
                  <img
                    src={`http://localhost:4000/${image.filePath}`}
                    key={index}
                    className={"max-w-[400px] mr-4  "}
                  />
                </div>
              );
            })
          ) : (
            <>
              <img
                 src={`http://localhost:4000/${images.filePath}`}
                className="md:max-w-[600px] md:h-96 lg:max-w-[600px] lg:h-96 mx-auto "
              />
            </>
          )}
        </div>
        <div className="w-64 flex flex-col gap-6 ml-64">
          <div className="title w-[341px] flex flex-col gap-4">
            <div className="text-xl text-center">
              <b>{name}</b>{" "}
            </div>
            <h1 className="text-xl font-bold ">
              {" "}
              ฿
              <b className="text-xl text-orange-700 bg-gray-100">
                {currencyFormat(Number(price))}{" "}
              </b>
            </h1>

            {/* <div className="prices flex flex-col">
              <span className="text-blue-500 cursor-pointer text-sm mt-1">
                Ver los medios de pago
              </span>
            </div> */}
            <div className="must-know">
              <h2 className="font-bold text-sm">
                {description && shortenText(description, 30)}
              </h2>
            </div>
            <div className="mt-5 md:text-2xl text-xl  ">แบรนด์ : {brand}</div>
            <div className="mt-2 md:text-2xl text-xl ">ยอดขาย : {sold}</div>
          </div>

          {/* <div className="md:text-4xl ml-32 lg:text-4xl text-xl text-center ">
            <b>{name}</b>{" "}
          </div>

          <div className="mt-2 text-start text-xl md:text-2xl lg:text-2xl text-gray-400 px-2 ">
            {description && shortenText(description, 30)}
          </div>

          <div className="px-5 py-2 mx-5 mt-5 text-4xl text-orange-700 bg-gray-100">
            ฿<b className="text-xl">{currencyFormat(Number(price))} </b>
          </div>
          <div className="mt-5 md:text-2xl text-xl px-5 ">แบรนด์ : {brand}</div>
          <div className="mt-2 md:text-2xl text-xl px-5">ยอดขาย : {sold}</div> */}

          {product &&
            [product].map((p, index) => (
              <div
                key={index}
                className=" mt-2 md:flex md:flex-row  lg:flex lg:flex-row md:pt-5 md:mx-20"
              >
                <div className="flex justify-center">
                  <button
                    className="w-64 p-2 mb-5 text-center text-white bg-red-700 border rounded-md hover:bg-red-600 hover:text-white hover:border-transparent"
                    onClick={() => dispatch(addToCart({ ...p, quantity }))}
                  >
                    เพิ่มใส่รถเข็น
                  </button>
                </div>
                <div className="flex justify-center">
                  <Link to={`/`}>
                    <button className="w-64 p-2 mb-5 text-center text-white bg-green-500 border rounded-md hover:bg-green-600 hover:text-white hover:border-transparent">
                      หน้าแรก
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* <hr></hr> */}
      <div className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-4 gap-x-2 md:w-[750px] lg:w-[750px] ">
        {images &&
          images.map((image, index) => {
            return (
              <div key={index} className=" my-5 rounded-md mx-5">
                <img
                  src={image && image.url}
                  key={index}
                  className={"object-cover h-32 "}
                  onClick={() => setMain(images[index])}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductImages;

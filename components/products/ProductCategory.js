import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cart/cartSlice.js";


const ProductCategory = ({ procategorys, productcategorys }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {}, [dispatch]);

  useEffect(() => {}, [dispatch]);

  return (
    <div>
      {/* {JSON.stringify(procategorys)} */}
      <section class="bg-white dark:bg-gray-900">
        <div class="lg:flex lg:-mx-2 mt-10">
          <div className="px-5 space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4">
            {procategorys.map((p, index) => (
              <>
                <a
                  href="#"
                  className="block font-medium text-gray-500 dark:text-gray-300 hover:underline"
                >
                  {p.name}
                </a>
              </>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 mt-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p, index) => (
              <>
                <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                  {/* <img
                    className="object-cover w-full rounded-md h-72 xl:h-80"
                    src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
                    alt="T-Shirt"
                  /> */}

                  <img
                    src={p.images[0].url}
                    className="object-cover w-full rounded-md h-84 xl:h-80"
                    //  className="object-cover h-48 mx-auto "  data-aos="fade-up"
                  />

                  <h4 className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200">
                    {p.name}
                  </h4>
                  <p className="text-blue-500">$12.55</p>
                  <button 
                  onClick={() => dispatch(addToCart({ ...p, quantity }))}
                  className="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mx-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    <span className="mx-1">Add to cart</span>
                  </button>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductCategory;

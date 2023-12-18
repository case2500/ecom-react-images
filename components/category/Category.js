import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
 import {  categorySettings } from '../../utils.jsx'
// import { useGetCategoriesQuery } from '../../api/meliApi'
import { useEffect,useState } from "react";
//  import { setCategories } from '../../slices/categorySlice'
import axios from 'axios'
import { URL } from "../../URL.js";

const categories1 = [
  {
    id: "MLA5725",
    name: "Mouse",
    categoryIcons:"MLA1512"
  },
  {
    id: "MLA1512",
    name: "CPU",
  },
  {
    id: "MLA1403",
    name: "Iphone",
  },
  {
    id: "MLA1071",
    name: "Animales y Mascotas",
  },
  {
    id: "MLA1367",
    name: "Antigüedades y Colecciones",
  }, {
    id: "MLA5725",
    name: "Accesorios para Vehículos",
  },
  {
    id: "MLA1512",
    name: "Agro",
  },
  {
    id: "MLA1403",
    name: "Alimentos y Bebidas",
  },
  {
    id: "MLA1071",
    name: "Animales y Mascotas",
  },
  {
    id: "MLA1367",
    name: "Antigüedades y Colecciones",
  }, {
    id: "MLA5725",
    name: "Accesorios para Vehículos",
  },
  {
    id: "MLA1512",
    name: "Agro",
  },
  {
    id: "MLA1403",
    name: "Alimentos y Bebidas",
  },
  {
    id: "MLA1071",
    name: "Animales y Mascotas",
  },
  {
    id: "MLA1367",
    name: "Antigüedades y Colecciones",
  }, {
    id: "MLA5725",
    name: "Accesorios para Vehículos",
  },
  {
    id: "MLA1512",
    name: "Agro",
  },
  {
    id: "MLA1403",
    name: "Alimentos y Bebidas",
  },
  {
    id: "MLA1071",
    name: "Animales y Mascotas",
  },
  {
    id: "MLA1367",
    name: "Antigüedades y Colecciones",
  }, {
    id: "MLA1071",
    name: "Animales y Mascotas",
  },
  {
    id: "MLA1367",
    name: "Antigüedades y Colecciones",
  }, {
    id: "MLA5725",
    name: "Accesorios para Vehículos",
  },
  {
    id: "MLA1512",
    name: "Agro",
  },
  {
    id: "MLA1403",
    name: "Alimentos y Bebidas",
  },
  {
    id: "MLA1071",
    name: "Animales y Mascotas",
  },
  {
    id: "MLA1367",
    name: "Antigüedades y Colecciones",
  }, {
    id: "MLA1071",
    name: "Animales y Mascotas",
  },
  {
    id: "MLA1367",
    name: "Antigüedades y Colecciones",
  }, {
    id: "MLA5725",
    name: "Accesorios para Vehículos",
  },
  {
    id: "MLA1512",
    name: "Agro",
  },
  {
    id: "MLA1403",
    name: "Alimentos y Bebidas",
  },
  {
    id: "MLA1071",
    name: "Animales y Mascotas",
  },
  {
    id: "MLA1367",
    name: "Antigüedades y Colecciones",
  }, {
    id: "MLA1071",
    name: "Animales y Mascotas",
  },
  {
    id: "MLA1367",
    name: "Antigüedades y Colecciones",
  }, {
    id: "MLA5725",
    name: "Accesorios para Vehículos",
  },
  {
    id: "MLA1512",
    name: "Agro",
  },
  {
    id: "MLA1403",
    name: "Alimentos y Bebidas",
  },
  {
    id: "MLA1071",
    name: "Animales y Mascotas",
  },
  {
    id: "MLA1367",
    name: "Antigüedades y Colecciones",
  },
];
export const Category = () => {
  // const categories = useAppSelector((state) => state.categories.categories)
 const [categories, setCategories] = useState("");
  // const dispatch = useAppDispatch()
  // const { isLoading, data } = useGetCategoriesQuery()

  const LoadCatergory = async () => {
    const loadcategory = await axios.get(`${URL}category`);
    console.log(loadcategory)
    setCategories(loadcategory.data)
    // categories(loadcategory.data);
   
  };
  useEffect(() => {
    LoadCatergory();
    // alert("load")
  }, []);


  return (
    <>
    {/* {JSON.stringify(categories)} */}
      <div className="  text-gray-700  flex-col rounded-md h-auto m-auto relative">
        {categories.length > 0 && (
          <section className="w-full max-w-homescreen m-auto category-slider">
            <h2 className="text-gray-600 text-left mb-5 text-2xl font-light">
            Catergory
            </h2>

            <div className="flex  ">
              {categories.map((category) => (
              
                <div className="flex-warp border border-gray-200 w-64  rounded-md p-2 text-center  text-md font-normal">
               
                  <span className="text-xl font-normal text-gray-400">
                    {category.name}
                  </span>
                </div>
              
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

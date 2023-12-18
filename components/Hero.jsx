import React,{useEffect} from 'react'

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { createSilder, getSilders } from "../store/silder/Silder.js";
import { useDispatch, useSelector } from "react-redux";

const SliderCard = () => {
  const dispatch = useDispatch();
  const { silder } = useSelector((state) => state.silder);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        appendDots: (dots) => {
          return <ul style={{ margin: "0px" }}>{dots}</ul>
        },
      }

      useEffect(() => {
        dispatch(getSilders());
      }, [dispatch]);

      return (
        <div className='hidden mt-2 bg-red-100 md:container md:mx-auto md:contents'>
        {/* {JSON.stringify(silder)} */}
          <Slider {...settings}>
            {silder.map((value, index) => {
              return (
                <div >
                  {/* <div className='flex justify-center rounded-md bg-red-50' key={index}> */}
                    {/* <div className='py-10 text-sm text-gray-600 md:text-xl'> */}
                      {/* <b className='py-2 mb-5 text-red-500 bg-gray-100 rounded-md md:px-5 md:text-4xl'>{value.title}</b> */}
                      {/* <p className='mt-5'>{value.desc}</p> */}
                      {/* <button className='btn-primary'>Visit Collections</button> */}
                    {/* </div> */}
                    <div className='w-full  mt-5'>
                      <img src={value.cover.filePath} alt=''  className='object-cover   ' />
                    </div>
                  {/* </div> */}
                </div>
              )
            })}
          </Slider>
        </div>
      )
}

export default SliderCard

import React from "react";
import Hero from "./Hero";
// import HeadlineCards from "./HeadlineCards";
// import Products from "./products/Products";
import MainProduct from "./MainProduct";

const Home = () => {
  return (
    <div className="container mx-auto">
<div className="h-screen">
  {/* <div className="grid w-4/5 grid-cols-2 grid-rows-3 gap-4 mx-auto md:grid-cols-3 md:grid-rows-4 h-5/6">
    <div className="row-span-1 bg-indigo-100 md:row-span-2">
      <span>01</span>
    </div>
    <div className="col-span-1 bg-red-100 md:col-span-2">
      <span>02</span>
    </div>
    <div className="bg-purple-100">
      <span>03</span>
    </div>
 
</div> */}

{/* <div className="h-screen">
  <div className="grid w-4/5 grid-cols-2 grid-rows-3 gap-4 mx-auto md:grid-cols-3 md:grid-rows-4 h-5/6">
    <div className="row-span-1 bg-indigo-100 md:row-span-2">
      <span>01</span>
    </div>
    <div className="col-span-1 bg-red-100 md:col-span-2">
      <span>02</span>
    </div>
    <div className="bg-purple-100">
      <span>03</span>
    </div>
    <div className="row-span-1 bg-violet-100 md:row-span-2">
      <span>04</span>
    </div>
    <div className="col-span-1 row-span-1 bg-sky-100 md:row-span-2 md:col-span-2">
      <span>05</span>
    </div>
    <div className="bg-emerald-100">
      <span>06</span>
    </div>
  </div>
</div> */}



      <Hero />
      <MainProduct />

</div>

    </div>
  );
};

export default Home;

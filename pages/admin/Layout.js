import React from "react";
// import Footer from "../footer/Footer.js";
import Dashboard from './Dashboard.js';

const Layout = ({ children }) => {
  return (
    <div className="h-screen border-r-4 border-gray-300 ">
      <div className="flex flex-row ">     
       <div >
         <Dashboard />
       </div> 
        <div className="px-20 mt-5" >
          {children}
        </div>
      </div>

      <div className="flex flex-row justify-center mt-10">
       
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;

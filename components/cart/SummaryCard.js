import React,{useEffect} from "react";
import AddressCard from "./AddressCard";
import PriceDetailsCard from "./PriceDetailsCard.js";

const SummaryCard = ({ setShowModal }) => {

useEffect(() => {
    
}, [])

  return (
    <div className="mx-auto bg-white md:container md:flex md:flex-row">
      <div className="md:flex-1">
        <AddressCard />
      </div>
      <div className="md:flex-1">
        <PriceDetailsCard />
      </div>
    </div>
  );
};

export default SummaryCard;

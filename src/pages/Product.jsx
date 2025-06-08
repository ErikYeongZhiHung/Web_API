import React from "react";
import Navbar from "../component/Navbar";

function Product({productdata}) {
  console.log("this is product data", productdata)
  return (
    <div className="w-full bg-yellow-400 py-10 flex justify-center items-center flex-col">
      <Navbar />
      <div className="grid grid-cols-3 gap-x-10 gap-y-5">
        {productdata.map((item) => {
          return (
            <div className="bg-red-400 rounded-2xl p-6 flex flex-col justify-center items-center w-fit">
              <img className="w-[300px]" src={item.image} alt="" />
              <h2 className="text-white py-3 text-2xl font-bold">
                {item.productname}
              </h2>
            </div> 
          );
        })}
      </div>
    </div>
  );
}

export default Product;

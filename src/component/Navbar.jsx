import React from "react";
import { Link } from "react-router-dom";
import { IoReorderThreeSharp } from "react-icons/io5";
import { useState } from "react";

function Navbar() {
  const [show, setshow] = useState(false);

  const handleshow = () => {
    setshow(!show);
  };

  return (
    <>
      <div className="hidden md:block">
        <div className="w-full flex flex-wrap text-white bg-black/80 py-3 justify-around items-center">
          <h1>lOGO</h1>
          <div className="flex gap-x-10">
            <h3>HOME</h3>
            <h3>PRODUCTS</h3>
            <h3>FAVOURITE</h3>
            <h3>NEW ARRIVAL</h3>
            <h3>MOST POPULAR</h3>
            <h3>ABOUT US</h3>
          </div>
          <div className="flex gap-x-10">
            <button className="px-10 py-2 rounded-2xl bg-red-500 text-2xl">
              login{" "}
            </button>
            <button className="px-10 py-2 rounded-2xl bg-red-500 text-2xl">
              signup
            </button>
          </div>
        </div>
      </div>

      {/* mobile navbar */}

      {/* {show  ? "" : ""} */}

      <div className="block md:hidden">
        <div className="flex bg-black/80  justify-between px-10">
          <h1 className="text-4xl text-white">logo</h1>
          <IoReorderThreeSharp
            onClick={handleshow}
            className="text-5xl text-white"
          />
        </div>
        {show ? (
          <div className="flex flex-col gap-y-10 rounded-2xl bg-black/50 py-10 text-white">
            <div className="flex flex-col w-full justify-center items-center gap-y-4 gap-x-10">
              <h3 className="font-bold text-xl">HOME</h3>
              <h3 className="font-bold text-xl">PRODUCTS</h3>
              <h3 className="font-bold text-xl">FAVOURITE</h3>
              <h3 className="font-bold text-xl">NEW ARRIVAL</h3>
              <h3 className="font-bold text-xl">MOST POPULAR</h3>
              <h3 className="font-bold text-xl">ABOUT US</h3>
            </div>
            <div className="flex w-full items-center justify-center  gap-x-10">
              <button className="px-10 py-2 rounded-2xl bg-red-500 text-2xl">
                login{" "}
              </button>
              <button className="px-10 py-2 rounded-2xl bg-red-500 text-2xl">
                signup
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        
      </div>
    </>
  );
}

export default Navbar;

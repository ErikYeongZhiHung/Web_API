import React from "react";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

function Testing() {
  const [count, setcount] = useState(0);

  const addvlaue = () => [setcount(count + 1)];

  const minusvalye = () => {
    if (count > 0) {
      setcount(count - 1);
    }
  };

  return (
    <div>
      <h3 className="text-4xl">this is usestate testing</h3>
      <div className="flex flex-col items-center justify-center w-full h-screen py-10">
        <div className="flex flex-col justify-center items-center gap-y-10">
          <h1 className="text-3xl">{count}</h1>
          <div className="flex gap-x-10">
            <button
              onClick={minusvalye}
              className="bg-yellow-700 flex gap-x-2 items-center cursor-pointer font-bold text-2xl text-white px-5 py-3 rounded-2xl"
            >
              Minus
              <MdDeleteOutline />
            </button>
            <button
              onClick={addvlaue}
              className="bg-yellow-700 flex gap-x-2 items-center cursor-pointer font-bold text-2xl text-white px-5 py-3 rounded-2xl"
            >
              Add
              <IoMdAddCircle />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testing;

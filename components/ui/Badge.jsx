import React from "react";

const Badge = ({ text, url }) => {
  return (
    <>
      <div className="flex gap-5">
        <span class="main-color-bg text-xl rounded-full font-bold text-white p-3 uppercase">
          Action
        </span>
        <span class="bg-gray-800 text-xl rounded-full font-bold text-white p-3 uppercase">
          Comedy
        </span>
        <span class="bg-gray-800 text-xl rounded-full font-bold text-white p-3 uppercase">
          Horror
        </span>
      </div>
    </>
  );
};

export default Badge;

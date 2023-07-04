import React from "react";

const Badge = ({ text, url }) => {
  return (
    <>
      <div className="flex gap-5">
        <span className="main-color-bg text-xl rounded-full font-bold text-white p-3 uppercase">
          Action
        </span>
        <span className="bg-gray-800 text-xl rounded-full font-bold text-white p-3 uppercase">
          Comedy
        </span>
        <span className="bg-gray-800 text-xl rounded-full font-bold text-white p-3 uppercase">
          Horror
        </span>
      </div>
    </>
  );
};

export default Badge;

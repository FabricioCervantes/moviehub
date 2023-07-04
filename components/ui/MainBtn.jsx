import React from "react";

const MainBtn = ({ text, icon, action }) => {
  return (
    <button
      onClick={action}
      className="px-5 py-2.5 relative rounded group font-medium text-white inline-block"
    >
      <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-l from-rose-700 to-pink-600"></span>
      <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 filter group-active:opacity-0 rounded opacity-50 bg-gradient-to-l from-rose-700 to-pink-600"></span>
      <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl filter group-active:opacity-0 group-hover:blur-sm bg-gradient-to-l from-rose-700 to-pink-600"></span>
      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-l from-rose-700 to-pink-600"></span>
      <span className="relative flex items-center gap-2">
        {icon}
        {text}
      </span>
    </button>
  );
};

export default MainBtn;

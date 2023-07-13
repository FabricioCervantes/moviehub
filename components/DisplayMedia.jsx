"use client";

import { useEffect, useState } from "react";

import MovieCard from "@components/MovieCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DisplayMedia = ({ movies }) => {
  return (
    <>
      <div className="text-white p-5">
        <div className="flex justify-center mt-10">
          <div className="grid md:grid-cols-4 gap-5">
            {movies.map((movie) => (
              <div key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
        {/* <div className="flex justify-end gap-5 p-2 mt-5">
          {pag.map((item) => (
            <p
              key={item}
              onClick={() => {
                handlePage(item);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              //check if page is active
              className={`${
                page === item ? "bg-red-500" : "bg-gray-500"
              } px-5 py-2 rounded-md hover:cursor-pointer hover:bg-red-500 hover:text-white`}
            >
              {item}
            </p>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default DisplayMedia;

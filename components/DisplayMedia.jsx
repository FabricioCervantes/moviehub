"use client";

import { useEffect, useState } from "react";

import MovieCard from "@components/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DisplayMedia = ({ media, type }) => {
  return (
    <>
      <div className="text-white p-5">
        <div className="flex justify-center mt-10">
          <div className="grid md:grid-cols-4 gap-5">
            {media.map((movie) => (
              <div key={movie.id}>
                <MovieCard movie={movie} type={type} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayMedia;

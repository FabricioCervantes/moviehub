import React from "react";
import Image from "next/image";

const MovieCard = () => {
  return (
    <div className="text-white w-fit">
      <Image
        src="/assets/barbie.jpg"
        width={300}
        height={300}
        alt="movie poster"
        className="rounded-md"
      ></Image>
      <div>
        <div className="flex justify-between">
          <h1>Barbie</h1>
          <p>2023</p>
        </div>
        <div className="flex justify-between">
          <p>4K</p>
          <div className="flex justify-between gap-5">
            <p>90 min</p>
            <p>4.5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

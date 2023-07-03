"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const MovieCard = () => {
  return (
    <div className="p-2 text-white rounded-md w-fit">
      <motion.div whileHover={{ scale: 1.05 }}>
        <Image
          src="/assets/barbie.jpg"
          width={300}
          height={300}
          alt="movie poster"
          className="rounded-md"
        ></Image>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl">Barbie</h1>
            <p>2023</p>
          </div>
          <div className="flex mt-5 justify-between">
            <p>4K</p>
            <div className="flex justify-between gap-5">
              <p>90 min</p>
              <p>4.5</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MovieCard;

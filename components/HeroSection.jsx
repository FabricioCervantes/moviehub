"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AiFillPlayCircle } from "react-icons/ai";
import MainBtn from "@components/ui/MainBtn";

const HeroSection = () => {
  return (
    <div className="relative top-0">
      <Image
        src="/assets/test1.jpg"
        width={0}
        height={0}
        sizes="100vw"
        style={{
          width: "100%",
          height: "800px",
          objectFit: "cover",
          opacity: "0.25",
        }} // optional
        alt="main image"
      ></Image>
      <motion.div
        initial={{ y: 400, x: -250 }}
        animate={{ y: -150 }}
        transition={{ duration: 1 }}
        className="top-1/2 hidden md:block absolute left-1/4 md:-translate-x-80 -translate-y-1/2"
      >
        <h1 className="text-white text-5xl font-extrabold main-color">
          MovieHub
        </h1>
        <p className="text-4xl text-white max-w-md mt-10">
          Track Your <span className="main-color"> Favorite</span> Movies & TV
          Shows
        </p>
        <div className="mt-10">
          <MainBtn icon={<AiFillPlayCircle />} text="Watch Now" url="/" />
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 400, x: -70 }}
        animate={{ y: -150 }}
        transition={{ duration: 1 }}
        className="top-1/2 absolute md:hidden left-1/4 md:-translate-x-80 -translate-y-1/2"
      >
        <h1 className="text-white text-5xl font-extrabold main-color">
          MovieHub
        </h1>
        <p className="text-4xl text-white max-w-md mt-10">
          Track Your <span className="main-color"> Favorite</span> Movies & TV
          Shows
        </p>
        <div className="mt-10">
          <MainBtn icon={<AiFillPlayCircle />} text="Watch Now" url="/" />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;

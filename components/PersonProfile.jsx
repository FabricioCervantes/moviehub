"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import MovieCard from "./Card";
import Carousel from "./Carousel";
import { motion } from "framer-motion";

const PersonProfile = ({ person }) => {
  return (
    <>
      <motion.div
        initial={{ y: 200, x: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center"
      >
        <div className="text-white max-w-5xl w-full">
          <div className="flex flex-col md:flex-row p-3 md:p-10 gap-10">
            <div className="min-w-fit flex flex-col items-center">
              <Image
                src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "auto",
                  height: "500px",
                  objectFit: "cover",
                }} // optional
                alt="person image"
                className="rounded-lg"
              />
              <div className="flex flex-col gap-1 mt-5">
                <h1 className="text-4xl md:hidden font-bold text-center mb-10">
                  {person.name}
                </h1>
                <p className="font-bold text-2xl">Personal Info</p>
                <p className="text-md">
                  <span className="font-bold">Born: </span>
                  {person.birthday}
                </p>
                <p className="text-md w-80">
                  <span className="font-bold">Place of Birth: </span>
                  {person.place_of_birth}
                </p>
                <div className="text-md">
                  <span className="font-bold">Gender: </span>
                  {person.gender === 1 ? <p>Female</p> : <p>Male</p>}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {/* get person name and biography */}
              <h1 className="text-4xl hidden md:block font-bold text-center md:text-left">
                {person.name}
              </h1>
              <p className="text-bold text-2xl">Biography</p>
              <p className="text-sm text-justify whitespace-pre-line ">
                {person.biography}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <h1 className="text-4xl font-bold text-center text-white">Images</h1>
      <div className="p-5">
        {person.images && (
          <Carousel data={person.images.profiles} type="person_images" />
        )}
      </div>
      <h1 className="text-4xl font-bold text-center text-white">Movies</h1>
      <div className="p-5">
        {person.movies && (
          <Carousel data={person.movies.cast} type="movie_poster" />
        )}
      </div>
    </>
  );
};

export default PersonProfile;

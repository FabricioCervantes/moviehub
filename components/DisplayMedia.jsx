"use client";

import MovieCard from "@components/Card";

import { motion, AnimatePresence } from "framer-motion";

const DisplayMedia = ({ media, type }) => {
  return (
    <>
      <motion.div
        initial={{ y: 200, x: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white p-5"
      >
        <div className="flex justify-center">
          <div className="grid md:grid-cols-4 gap-5">
            {media.map((movie) => (
              <div key={movie.id}>
                <MovieCard movie={movie} type={type} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default DisplayMedia;

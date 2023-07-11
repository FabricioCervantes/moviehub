"use client";

import React, { useEffect, useState } from "react";

import ViewPage from "@components/ViewPage";

const View = ({ params }) => {
  const mediaId = params?.id;

  const [media, setMedia] = useState([]); // [1

  const getMovieDetails = async () => {
    const res = await fetch(`/api/view/${mediaId}/`);
    const data = await res.json();
    setMedia(data);
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return <ViewPage movie={media} />;
};

export default View;

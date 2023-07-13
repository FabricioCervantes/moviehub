"use client";

import React, { useEffect, useState } from "react";

import ViewPage from "@components/ViewPage";

const View = ({ params: { id } }) => {
  const mediaId = id;

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/view/${mediaId}/`);
      const data = await res.json();
      setMovie(data);
    };
    getData();
  }, [movie]);

  return (
    <div>
      <ViewPage media={movie} />
    </div>
  );
};

export default View;

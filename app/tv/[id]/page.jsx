"use client";

import React, { useEffect, useState } from "react";
import ViewPage from "@components/ViewPage";

const page = ({ params: { id } }) => {
  const mediaId = id;

  const [show, setShow] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/tv/${mediaId}/`);
      const data = await res.json();
      setShow(data);
    };
    getData();
  }, [show]);

  return (
    <div>
      <ViewPage media={show} />
    </div>
  );
};

export default page;

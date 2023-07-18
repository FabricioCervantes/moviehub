"use client";
import React from "react";
import { useState, useEffect } from "react";
import SeasonView from "@components/SeasonView";
const page = ({ params }) => {
  const seasonId = params.seasonId;

  const [season, setSeason] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/tv/${params.id}/season/${seasonId}`);
      const data = await res.json();
      setSeason(data);
    };
    getData();
  }, [season]);

  return <SeasonView season={season} />;
};

export default page;

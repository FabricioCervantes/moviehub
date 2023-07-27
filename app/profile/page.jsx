"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";
import { useState, useEffect } from "react";

const page = () => {
  const { data: session } = useSession();
  const [watchlist, setWatchlist] = useState([]);

  const getWatchlistItems = () => {
    return fetch(`/api/lists/watchlist/${session?.user.id}`).then((res) =>
      res.json()
    );
  };

  const getMedia = (mediaId, mediaType) => {
    console.log(mediaType);
    if (mediaType === "movie") {
      return fetch(`/api/view/${mediaId}`).then((res) => res.json());
    } else {
      return fetch(`/api/tv/${mediaId}`).then((res) => res.json());
    }
  };

  const getItems = async () => {
    const items = await getWatchlistItems();
    const mediaPromises = items.map((item) =>
      getMedia(item.mediaId, item.mediaType)
    );
    const mediaList = await Promise.all(mediaPromises);
    const updatedWatchlist = [...watchlist, ...mediaList];
    setWatchlist(updatedWatchlist);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>{session && <Profile user={session.user} watchlist={watchlist} />}</>
  );
};

export default page;

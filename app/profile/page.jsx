"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";
import { useState, useEffect } from "react";

const page = () => {
  const { data: session } = useSession();
  const [watchlist, setWatchlist] = useState([]);
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const getWatchlistItems = () => {
    return fetch(`/api/lists/watchlist/${session?.user.id}`).then((res) =>
      res.json()
    );
  };

  const getHistoryItems = () => {
    return fetch(`/api/lists/history/${session?.user.id}`).then((res) =>
      res.json()
    );
  };

  const getFavoritesItems = () => {
    return fetch(`/api/lists/favorites/${session?.user.id}`).then((res) =>
      res.json()
    );
  };

  const getMedia = (mediaId, mediaType) => {
    if (mediaType === "movie") {
      return fetch(`/api/view/${mediaId}`).then((res) => res.json());
    } else {
      return fetch(`/api/tv/${mediaId}`).then((res) => res.json());
    }
  };

  const getWatchlist = async () => {
    const items = await getWatchlistItems();
    const mediaPromises = items.map((item) =>
      getMedia(item.mediaId, item.mediaType)
    );
    const mediaList = await Promise.all(mediaPromises);
    const updatedWatchlist = [...watchlist, ...mediaList];
    setWatchlist(updatedWatchlist);
  };

  const getFavorites = async () => {
    const items = await getFavoritesItems();
    const mediaPromises = items.map((item) =>
      getMedia(item.mediaId, item.mediaType)
    );
    const mediaList = await Promise.all(mediaPromises);
    const updatedFavorites = [...favorites, ...mediaList];
    setFavorites(updatedFavorites);
  };

  const getHistory = async () => {
    const items = await getHistoryItems();
    const mediaPromises = items.map((item) =>
      getMedia(item.mediaId, item.mediaType)
    );
    const mediaList = await Promise.all(mediaPromises);
    const updatedHistory = [...history, ...mediaList];
    setHistory(updatedHistory);
  };

  useEffect(() => {
    getWatchlist();
    getHistory();
    getFavorites();
  }, []);

  console.log(history);

  return (
    <>
      {session && (
        <Profile
          user={session.user}
          watchlist={watchlist}
          history={history}
          favorites={favorites}
        />
      )}
    </>
  );
};

export default page;

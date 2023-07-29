"use client";

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdOutlineAddCircle, MdFavorite, MdHistory } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ListsButton = ({ media, type }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [watchlist, setWatchlist] = useState(media.watchlist);
  const [favorites, setFavorites] = useState(media.favorite);
  const [history, setHistory] = useState(media.history);

  console.log(media);
  const handleAddclick = async () => {
    if (!watchlist) {
      try {
        const response = await fetch("/api/lists/watchlist/new", {
          method: "POST",
          body: JSON.stringify({
            userId: session?.user.id,
            mediaId: media.id,
            mediaType: type,
          }),
        });

        if (response.ok) {
          setWatchlist(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await fetch(`/api/lists/watchlist/${media.id}`, {
          method: "DELETE",
        });
        setWatchlist(false);
      } catch (error) {
        console.log(error);
      }
      //   errase watchlist from media
    }
  };

  const handleFavoriteclick = async () => {
    if (!favorites) {
      try {
        const response = await fetch("/api/lists/favorites/new", {
          method: "POST",
          body: JSON.stringify({
            userId: session?.user.id,
            mediaId: media.id,
            mediaType: type,
          }),
        });

        if (response.ok) {
          setFavorites(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await fetch(`/api/lists/favorites/${media.id}`, {
          method: "DELETE",
        });
        setFavorites(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleHistoryclick = async () => {
    if (!history) {
      try {
        const myDate = getCurrentDate();
        const response = await fetch("/api/lists/history/new", {
          method: "POST",
          body: JSON.stringify({
            userId: session?.user.id,
            mediaId: media.id,
            timeWatched: myDate,
            mediaType: type,
          }),
        });

        if (response.ok) {
          setHistory(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await fetch(`/api/lists/history/${media.id}`, {
          method: "DELETE",
        });
        setHistory(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // get current date with format YYYY-MM-DD HH:MM:SS
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() is zero-based
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MdOutlineAddCircle className="text-4xl" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Lists</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleAddclick()}
            className="hover:cursor-pointer"
          >
            {watchlist ? (
              <>
                <BsCheckCircleFill className="text-3xl ml-1  text-red-500 mr-2" />
                <p>Added to watchlist</p>
              </>
            ) : (
              <>
                <AiFillEye className="text-4xl mr-2" />
                <p>Add to watchlist</p>
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleFavoriteclick()}
            className="hover:cursor-pointer"
          >
            {favorites ? (
              <>
                <BsCheckCircleFill className="text-3xl ml-1  text-red-500 mr-2" />
                <p>Added to favorites</p>
              </>
            ) : (
              <>
                <MdFavorite className="text-4xl mr-2" />
                <p>Add to favorites</p>
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleHistoryclick()}
            className="hover:cursor-pointer"
          >
            {history ? (
              <>
                <BsCheckCircleFill className="text-3xl ml-1  text-red-500 mr-2" />
                <p>Added to history</p>
              </>
            ) : (
              <>
                <MdHistory className="text-4xl mr-2" />
                <p>Add to history</p>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ListsButton;

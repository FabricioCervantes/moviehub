"use client";

import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdOutlineAddCircle, MdFavorite, MdHistory } from "react-icons/md";
import { GiPopcorn } from "react-icons/gi";
import { AiOutlineHistory, AiFillEye } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ListsButton = ({ media, type }) => {
  const router = useRouter();
  const { data: session } = useSession();

  console.log(media);
  const handleAddclick = async () => {
    if (!media.watchlist) {
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
          router.push("/profile");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await fetch(`/api/lists/watchlist/${media.id}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.log(error);
      }
      //   errase watchlist from media
      media.watchlist = false;
      window.location.reload(true);
    }
  };

  const handleFavoriteclick = async () => {
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
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleHistoryclick = async () => {
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
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
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

  useEffect(() => {}, [media]);
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
            {media.watchlist ? (
              <>
                <AiFillEye className="text-4xl mr-2" />
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
            {media.favorite ? (
              <>
                <MdFavorite className="text-4xl mr-2" />
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
            {media.history ? (
              <>
                <MdHistory className="text-4xl mr-2" />
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

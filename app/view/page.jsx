"use client";

import MovieInfo from "@components/MovieInfo";
import { useSearchParams } from "next/navigation";

const View = () => {
  const searchParams = useSearchParams();
  const mediaId = searchParams.get("id");
  return (
    <div>
      <MovieInfo mediaId={mediaId} />
    </div>
  );
};

export default View;

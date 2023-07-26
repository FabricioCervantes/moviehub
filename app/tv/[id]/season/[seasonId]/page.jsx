import React from "react";
import SeasonView from "@components/SeasonView";
import { headers } from "next/headers";

const page = async ({ params }) => {
  const seasonId = params.seasonId;

  const host = headers().get("host");
  const res = await fetch(
    `http://${host}/api/tv/${params.id}/season/${seasonId}`
  );
  const data = await res.json();

  return <SeasonView season={data} />;
};

export default page;

import React from "react";
import ViewPage from "@components/ViewPage";
import { headers } from "next/headers";

const page = async ({ params: { id } }) => {
  const mediaId = id;

  const host = headers().get("host");
  const res = await fetch(`http://${host}/api/tv/${mediaId}/`);
  const data = await res.json();

  return (
    <div>
      <ViewPage media={data} />
    </div>
  );
};

export default page;

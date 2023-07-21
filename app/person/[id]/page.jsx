import React from "react";
import PersonProfile from "@components/PersonProfile";
import { headers } from "next/headers";

const page = async ({ params }) => {
  const host = headers().get("host");
  const res = await fetch(`http://${host}/api/person/${params.id}/`);
  const data = await res.json();

  return (
    <div>
      <PersonProfile person={data} />
    </div>
  );
};

export default page;

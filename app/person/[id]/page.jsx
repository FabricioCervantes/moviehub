"use client";

import React from "react";
import PersonProfile from "@components/PersonProfile";

const Person = async ({ params }) => {
  const personId = params?.id;

  const res = await fetch(`/api/person/${personId}/`);
  const data = await res.json();

  return (
    <div>
      <PersonProfile profile={data} />
    </div>
  );
};

export default Person;

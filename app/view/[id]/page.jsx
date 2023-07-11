"use client";

import React from "react";

import ViewPage from "@components/ViewPage";

const View = async ({ params }) => {
  const mediaId = params?.id;

  const res = await fetch(`/api/view/${mediaId}/`);
  const data = await res.json();

  return <ViewPage movie={data} />;
};

export default View;

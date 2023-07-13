"use client";

import React, { useEffect, useState } from "react";
import PersonProfile from "@components/PersonProfile";

const page = ({ params }) => {
  const [profile, setProfile] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/person/${params.id}/`);
      const data = await res.json();
      setProfile(data);
    };
    getData();
  }, [profile]);

  return (
    <div>
      <PersonProfile person={profile} />
    </div>
  );
};

export default page;
"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";

const page = () => {
  const { data: session } = useSession();

  return <>{session && <Profile user={session.user} />}</>;
};

export default page;

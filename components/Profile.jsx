import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = ({ user }) => {
  console.log(user);
  const userImageUrl = user.image.replaceAll("s96-c", "s1000-c");
  console.log(userImageUrl);
  return (
    <>
      <div className="flex justify-center">
        <div className="text-white max-w-5xl w-full grid place-content-center text-center">
          <Avatar className="w-80 h-80">
            <AvatarImage src={userImageUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl mt-5">{user.name}</h1>
          <h2 className="text-lg ">{user.email}</h2>
        </div>
      </div>
    </>
  );
};

export default Profile;
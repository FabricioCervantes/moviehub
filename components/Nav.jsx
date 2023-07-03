import Link from "next/link";
import React from "react";
import Image from "next/image";
import MainBtn from "./ui/MainBtn";

const Nav = () => {
  return (
    <nav className="bg-transparent w-full flex justify-between text-white p-5 items-center">
      <Link href="/">
        <Image
          src="/assets/logo.png"
          alt="logo"
          height={150}
          width={150}
        ></Image>
      </Link>
      <ul className="hidden md:flex gap-20">
        <Link href="/">
          <div className="text-2xl font-bold">MOVIES</div>
        </Link>
        <Link href="/">
          <div className="text-2xl font-bold">TV SHOWS</div>
        </Link>
        <Link href="/">
          <div className="text-2xl font-bold">PRICING</div>
        </Link>
        <Link href="/">
          <div className="text-2xl font-bold">ABOUT</div>
        </Link>
      </ul>
      <ul>
        <MainBtn text="Sign In" />
      </ul>
    </nav>
  );
};

export default Nav;

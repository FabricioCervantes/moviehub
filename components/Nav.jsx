import Link from "next/link";
import React from "react";
import Image from "next/image";

const Nav = () => {
  return (
    <nav className="nav-bg flex justify-between text-white p-5 items-center">
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
        <a
          href="#_"
          class="px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block"
        >
          <span class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-l from-rose-700 to-pink-600"></span>
          <span class="h-full w-full inset-0 absolute mt-0.5 ml-0.5 filter group-active:opacity-0 rounded opacity-50 bg-gradient-to-l from-rose-700 to-pink-600"></span>
          <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl filter group-active:opacity-0 group-hover:blur-sm bg-gradient-to-l from-rose-700 to-pink-600"></span>
          <span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-l from-rose-700 to-pink-600"></span>
          <span class="relative">Sign In</span>
        </a>
      </ul>
    </nav>
  );
};

export default Nav;

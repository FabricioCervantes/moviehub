"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import Image from "next/image";
import MainBtn from "./ui/MainBtn";
import { GiHamburgerMenu } from "react-icons/gi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex bg-transparent justify-between text-white p-5 items-center">
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
      {session?.user ? (
        <ul className="hidden md:block">
          <MainBtn text="Sign Out" />
        </ul>
      ) : (
        <ul className="hidden md:block">
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                text="Sign In"
              >
                Sign In
              </button>
            ))}
        </ul>
      )}
      <ul className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <GiHamburgerMenu className="text-4xl" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg border-0 text-white w-screen h-screen flex flex-col pt-20 gap-8 items-center">
            <DropdownMenuLabel>
              <MainBtn text="Sign In" />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/">
                <div className="text-4xl">MOVIES</div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {" "}
              <Link href="/">
                <div className="text-4xl">TV SHOWS</div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {" "}
              <Link href="/">
                <div className="text-4xl">PRICING</div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {" "}
              <Link href="/">
                <div className="text-4xl">ABOUT</div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ul>
    </nav>
  );
};

export default Nav;

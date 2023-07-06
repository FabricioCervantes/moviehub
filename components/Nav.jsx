"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import Image from "next/image";
import MainBtn from "./ui/MainBtn";
import { GiHamburgerMenu } from "react-icons/gi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        <Link href="/movies">
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
        <div className="flex gap-5 items-center">
          <ul className="hidden md:block">
            <MainBtn action={signOut} text="Sign Out" />
          </ul>
          <Avatar className="hidden md:block">
            <AvatarImage src={session?.user.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <ul className="hidden md:block">
          {providers &&
            Object.values(providers).map((provider) => (
              <MainBtn
                type="button"
                key={provider.name}
                action={() => {
                  signIn(provider.id);
                }}
                text="Sign In"
              ></MainBtn>
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
              {session?.user ? (
                <div className="flex flex-col gap-10 items-center">
                  <Avatar className="h-32 w-auto">
                    <AvatarImage src={session?.user.image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <ul>
                    <MainBtn action={signOut} text="Sign Out" />
                  </ul>
                </div>
              ) : (
                <ul>
                  {providers &&
                    Object.values(providers).map((provider) => (
                      <MainBtn
                        type="button"
                        key={provider.name}
                        action={() => {
                          signIn(provider.id);
                        }}
                        text="Sign In"
                      ></MainBtn>
                    ))}
                </ul>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/movies">
                <div className="text-4xl">MOVIES</div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
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

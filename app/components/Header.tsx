"use client";

import { Github, MoonIcon, SunIcon, Twitter } from "lucide-react";
import { Inter } from "next/font/google";
import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";
import Logo from "@/ui/Logo";

const inter = Inter({ subsets: ["latin"] });

const Header = () => {
  const [stars, setStars] = React.useState(0);
  const { theme: currentTheme, setTheme } = useTheme();

  React.useEffect(() => {
    fetch("https://api.github.com/repos/NiazMorshed2007/appwrite-writer")
      .then((res) => res.json())
      .then((res) => {
        setStars(res.stargazers_count);
      });
  }, []);
  return (
    <header
      className={`${inter.className} w-full header backdrop-blur-sm z-50 py-5 fixed top-0 left-0 flex items-center justify-between px-[7%]`}
    >
      <Logo />
      <nav className="flex items-center gap-7">
        <Link
          target="_blank"
          className="flex text-sm p-2 px-3 items-center gap-2 bg-gray-300 dark:bg-gray-800 rounded-full"
          href="https://github.com/NiazMorshed2007/appwrite-manager"
        >
          <Github className="w-5 h-5" />
          {stars} Stars
        </Link>
        <Link target="_blank" href="https://twitter.com/niazmorshed_">
          <Twitter className="w-5 h-5" />
        </Link>
        <button
          className="rounded-full w-[34px] flex items-center justify-center p-0 h-[34px]"
          onClick={() => setTheme(currentTheme === "light" ? "dark" : "light")}
        >
          <SunIcon
            size={20}
            className="rotate-0 text-xl scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <MoonIcon
            size={20}
            className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
        </button>
      </nav>
    </header>
  );
};

export default Header;

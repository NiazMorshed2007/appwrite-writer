import { Inter } from "next/font/google";
import Link from "next/link";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

const Footer = () => {
  return (
    <footer
      className={`${inter.className} relative z-40 text-sm gap-2 flex items-center justify-center py-3`}
    >
      Created by{" "}
      <Link
        href={"https://github.com/NiazMorshed2007"}
        className="underline"
        target="_blank"
      >
        {" "}
        Niaz Morshed
      </Link>
    </footer>
  );
};

export default Footer;

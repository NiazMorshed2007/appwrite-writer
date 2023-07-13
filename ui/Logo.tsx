import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="flex items-center gap-3">
        <img src="/logo.svg" className="w-[30px] h-[30px]" alt="" />
        <h2 className="font-semibold select-none cursor-pointer">
          Appwrite Writer
        </h2>
      </div>
    </Link>
  );
};

export default Logo;

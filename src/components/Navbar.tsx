import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="h-24 flex items-center justify-between">
      {/* LEFT */}
      <div className="md:hidden lg:block w-[20%]">
        <Link href="/" className="font-bold text-xl text-blue-600">
          SOCIAL
        </Link>
      </div>
      {/* MID */}
      <div className="hidden md:flex w-[50%] text-sm">
        {/* LINKS */}
        <div className="flex gap-6 text-gray-600">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/home.png"
              alt="Homepage"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            Home
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/friends.png"
              alt="Homepage"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            Friends
          </Link>
          <Link href="/" className="flex items-center gap-2 ">
            <Image
              src="/stories.png"
              alt="Homepage"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            Stories
          </Link>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <MobileNav />
      </div>
    </div>
  );
};

export default Navbar;

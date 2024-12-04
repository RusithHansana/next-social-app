import Link from "next/link";
import Image from "next/image";
import React from "react";

const FriendRequests = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href="/" className="text-blue-500">
          See All
        </Link>
      </div>
      {/* REQUESTS */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center justify-between">
          <Image
            src="https://picsum.photos/id/177/200/300"
            alt="user"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">Bruce Wayne</span>
        </div>
        <div className="flex gap-3 items-center justify-end">
          <Image
            src="/accept.png"
            alt="user"
            width={20}
            height={20}
            className="w-5 h-5 cursor-pointer"
          />
          <Image
            src="/reject.png"
            alt="user"
            width={20}
            height={20}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;

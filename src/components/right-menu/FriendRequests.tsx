import Link from "next/link";
import Image from "next/image";
import React from "react";
import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/client";
import FriendRequestList from "./FriendRequestList";

const FriendRequests = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return null;

  const requests = await prisma.followRequest.findMany({
    where: {
      recieverId: currentUser.id,
    },
    include: {
      sender: true,
    },
  });

  if (requests.length === 0) return null;

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
      <FriendRequestList requests={requests} />
    </div>
  );
};

export default FriendRequests;

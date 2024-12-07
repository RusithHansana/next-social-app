import prisma from "@/lib/client";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserInfoCardInteraction from "./UserInfoCardInteraction";

const UserInfoCard = async ({ user }: { user: User }) => {
  const createdAtDate = new Date(user.createAt);

  const formattedDate = createdAtDate.toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let isUserBlocked = false;
  let isFollwing = false;
  let isFollowingSent = false;

  const currentUser = await getCurrentUser();

  if (currentUser) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUser.id,
        blockedId: user.id,
      },
    });

    blockRes && (isUserBlocked = true);

    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUser.id,
        followingId: user.id,
      },
    });

    followRes && (isFollwing = true);

    const followRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUser.id,
        recieverId: user.id,
      },
    });

    followRequest && (isFollowingSent = true);
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href="/" className="text-blue-500">
          See All
        </Link>
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">
            {user.name && user.surname
              ? user.name + " " + user.surname
              : user.username}
          </span>
          <span className="text-sm">@{user.username}</span>
        </div>
        <p>{user.description || "No description about the user"}</p>
        {user.city && (
          <div className="flex items-center gap-2">
            <Image src="/map.png" alt="map" width={16} height={16} />
            <span>
              Living in <strong>{user.city}</strong>
            </span>
          </div>
        )}
        {user.school && (
          <div className="flex items-center gap-2">
            <Image src="/school.png" alt="map" width={16} height={16} />
            <span>
              Went to <strong>{user.school}</strong>
            </span>
          </div>
        )}
        {user.work && (
          <div className="flex items-center gap-2">
            <Image src="/work.png" alt="map" width={16} height={16} />
            <span>
              Works at <strong>{user.work}</strong>
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          {user.website && (
            <div className="flex gap-2 items-center">
              <Image src="/link.png" alt="map" width={16} height={16} />
              <Link href="/" className="text-blue-500 font-medium">
                {user.website}
              </Link>
            </div>
          )}
          <div className="flex gap-2 items-center">
            <Image src="/date.png" alt="map" width={16} height={16} />
            <span>Joined {formattedDate}</span>
          </div>
        </div>
        <UserInfoCardInteraction
          userId={user.id}
          currentUserId={currentUser.id}
          isUserBlocked={isUserBlocked}
          isFollowing={isFollwing}
          isFollowingSent={isFollowingSent}
        />
      </div>
    </div>
  );
};

export default UserInfoCard;

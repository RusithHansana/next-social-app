import prisma from "@/lib/client";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserMediaCard = async ({ user }: { user: User }) => {
  const postsWithMedia = await prisma.post.findMany({
    where: {
      userId: user.id,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createAt: "desc",
    },
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href="/" className="text-blue-500">
          See All
        </Link>
      </div>
      {/* BOTTOM */}
      <div className="flex gap-4 justify-between flex-wrap">
        {postsWithMedia.length ? (
          postsWithMedia.map((post) => (
            <div className="relative w-1/5 h-24" key={post.id}>
              <Image
                src={post.img!}
                alt="image"
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))
        ) : (
          <span className="text-gray-500">No media found</span>
        )}
      </div>
    </div>
  );
};

export default UserMediaCard;

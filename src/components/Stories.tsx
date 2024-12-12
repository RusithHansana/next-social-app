import prisma from "@/lib/client";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Image from "next/image";
import React from "react";
import StoryList from "./StoryList";

const Stories = async () => {
  const currentUser = await getCurrentUser();
  const stories = await prisma.story.findMany({
    where: {
      expiresAt: {
        gte: new Date(),
      },
      OR: [
        {
          user: {
            followers: {
              some: {
                followerId: currentUser.id,
              },
            },
          },
        },
        {
          userId: currentUser.id,
        },
      ],
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hidden">
      <div className="flex gap-8 w-max">
        <StoryList stories={stories} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Stories;

"use client";

import React, { useOptimistic, useState } from "react";
import Image from "next/image";
import { Story, User } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import { handleAddStory } from "@/lib/actions";
import LoadingSpinner from "./LoadingSpinner";

type StoryWithUser = Story & {
  user: User;
};

const StoryList = ({
  stories,
  currentUser,
}: {
  stories: StoryWithUser[];
  currentUser: User;
}) => {
  const [storyList, setStoryList] = useState(stories);
  const [img, setImg] = useState<any>();

  const [optimisticStories, addOptimisticStory] = useOptimistic(
    storyList,
    (state, value: StoryWithUser) => [value, ...state]
  );

  const addStory = async () => {
    if (!img?.secure_url) return;

    addOptimisticStory({
      id: Math.random().toString(),
      img: img.secure_url,
      createAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId: currentUser.id,
      user: {
        id: currentUser.id,
        clerkId: currentUser.clerkId,
        username: "Sending...",
        avatar: currentUser.avatar,
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createAt: new Date(Date.now()),
      },
    });

    try {
      const createdStory = await handleAddStory(img.secure_url);
      setStoryList((prev) => [createdStory, ...prev]);
      setImg(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CldUploadWidget
        uploadPreset="Social-App"
        onSuccess={(result, { widget }) => {
          setImg(result.info);
          widget.close();
        }}
      >
        {({ open }) => (
          <div className="flex flex-col items-center gap-2 cursor-pointer relative">
            <Image
              src={img?.secure_url || currentUser.avatar || "/noAvatar.png"}
              alt="story"
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover"
              onClick={() => open()}
            />
            {img ? (
              <form action={addStory}>
                <button className="text-xs bg-blue-500 rounded-md text-white p-2">
                  Send
                </button>
              </form>
            ) : (
              <span className="font-medium">Add A Story</span>
            )}
            <div
              onClick={() => open()}
              className="absolute text-6xl text-gray-200 top-1"
            >
              +
            </div>
          </div>
        )}
      </CldUploadWidget>
      {optimisticStories.map((story) => (
        <div
          className="flex flex-col items-center gap-2 cursor-pointer"
          key={story.id}
        >
          <Image
            src={story.user.avatar || "/noAvatar.png"}
            alt="story"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">
            {story.user.name || story.user.username}
          </span>
        </div>
      ))}
    </>
  );
};

export default StoryList;

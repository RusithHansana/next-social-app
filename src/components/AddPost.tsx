import prisma from "@/lib/client";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Image from "next/image";
import React from "react";

const AddPost = () => {
  const addPost = async (formData: FormData) => {
    "use server";
    const user = await getCurrentUser();
    const desc = formData.get("desc") as string;
    try {
      const post = await prisma.post.create({
        data: {
          userId: user.id,
          description: desc,
        },
      });

      if (!post) throw new Error("Post creation failed");

      console.log("Post created successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* AVATAR */}
      <Image
        src="https://picsum.photos/id/64/200/300"
        alt="profile"
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full"
      />
      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form action={addPost} className="flex gap-4">
          <textarea
            name="desc"
            id="desc"
            placeholder="What's on your mind?"
            className="flex-1 bg-slate-100 rounded-lg p-2"
          ></textarea>
          <Image
            src="/emoji.png"
            alt="emoji"
            width={20}
            height={20}
            className="w-5 h-5 cursor-pointer self-end"
          />
          <button className="p-1 text-white text-xs bg-blue-500 rounded-md">
            Post
          </button>
        </form>
        {/* POST OPTIONS */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addimage.png"
              alt="add photo"
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer self-end"
            />
            Photo
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addVideo.png"
              alt="add video"
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer self-end"
            />
            Video
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/poll.png"
              alt="create poll"
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer self-end"
            />
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addevent.png"
              alt="add event"
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer self-end"
            />
            Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;

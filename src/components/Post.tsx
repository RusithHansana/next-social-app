import Image from "next/image";
import React from "react";
import Comments from "./Comments";

const Post = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://picsum.photos/id/65/200/300"
            alt="profile"
            width={40}
            height={40}
            className="w-10 h-10 object-cover rounded-full"
          />
          <span className="font-medium">Jessica Brown</span>
        </div>
        <Image src="/more.png" alt="profile" width={16} height={16} />
      </div>
      {/* DESCRIPTION */}
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-96 relative">
          <Image
            src="https://picsum.photos/200/300"
            alt="profile"
            fill
            className="object-cover rounded-md"
          />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quidem
          reiciendis corporis vitae neque omnis ea laudantium, ducimus, libero
          facere, magni consequuntur tempore nostrum eos dignissimos ratione
          tenetur sapiente enim!
        </p>
      </div>
      {/* INTERACTION */}
      <div className="flex items-center justify-between text-sm my-4">
        <div className="flex gap-8">
          <div className="flex items-centet gap-4 bg-slate-50 p-2 rounded-xl">
            <Image
              src="/like.png"
              alt="like"
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              123<span className="hidden md:inline"> Likes</span>
            </span>
          </div>
          <div className="flex items-centet gap-4 bg-slate-50 p-2 rounded-xl">
            <Image
              src="/comment.png"
              alt="comment"
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              123<span className="hidden md:inline"> Comments</span>
            </span>
          </div>
        </div>
        <div className="">
          <div className="flex items-centet gap-4 bg-slate-50 p-2 rounded-xl">
            <Image
              src="/share.png"
              alt="share"
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              123<span className="hidden md:inline"> Shares</span>
            </span>
          </div>
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default Post;

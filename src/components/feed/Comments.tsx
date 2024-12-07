import React from "react";
import Image from "next/image";

const Comments = () => {
  return (
    <div>
      {/* WRITE */}
      <div className="flex items-center gap-4">
        <Image
          src="https://picsum.photos/id/64/200/300"
          alt="profile"
          width={32}
          height={32}
          className="w-8 h-8 object-cover rounded-full"
        />
        <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
          <input
            type="text"
            placeholder="Wrie a comment..."
            className="bg-transparent outline-none flex-1"
          />
          <Image
            src="/emoji.png"
            alt="emoji"
            width={16}
            height={16}
            className="w-4 h-4 object-cover rounded-full cursor-pointer"
          />
        </div>
      </div>
      {/* COMMENTS */}
      <div className="">
        {/* COMMENT */}
        <div className="flex gap-4 justify-between mt-6">
          {/* AVATAR */}
          <Image
            src="https://picsum.photos/id/91/200/300"
            alt="profile"
            width={40}
            height={40}
            className="w-10 h-10 object-cover rounded-full"
          />
          {/* DESCRIPTION */}
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-medium">Jane</span>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis
              laborum accusantium molestias. Ratione possimus quam similique
              aspernatur doloremque, non odit temporibus est maxime delectus
              ipsum vitae consequatur, fugit omnis pariatur?
            </p>
            <div className="flex items-center gap-8 text-xm text-gray-500">
              <div className="flex items-center gap-4">
                <Image
                  src="/like.png"
                  alt="like"
                  width={12}
                  height={12}
                  className="w-3 h-3 cursor-pointer"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">123 Likes</span>
              </div>
              <div className="">Reply</div>
            </div>
          </div>
          {/* ICON */}
          <Image
            src="/more.png"
            alt="more"
            width={16}
            height={16}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Comments;

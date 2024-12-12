"use client";

import React, { useState } from "react";
import Image from "next/image";
import { handleDeletePost } from "@/lib/actions";
import { useFormStatus } from "react-dom";
import LoadingSpinner from "../LoadingSpinner";
import DeletePostButton from "./DeletePostButton";

const PostInfo = ({ postId }: { postId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  //instead of adding a hidden input bind the postId to the function
  const deletePostById = handleDeletePost.bind(null, postId);

  const { pending } = useFormStatus();
  return (
    <div className="relative">
      <Image
        src="/more.png"
        alt="profile"
        width={16}
        height={16}
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer"
      />
      {isOpen && (
        <div className="absolute w-32 p-4 top-4 right-0 bg-gray-100 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-10">
          <span className="cursor-pointer">View</span>
          <span className="cursor-pointer">Re-post</span>
          <form action={deletePostById}>
            <DeletePostButton />
          </form>
        </div>
      )}
    </div>
  );
};

export default PostInfo;

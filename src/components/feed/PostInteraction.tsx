"use client";

import React, { useOptimistic, useState } from "react";
import Image from "next/image";
import { handleLike } from "@/lib/actions";

const PostInteraction = ({
  currentUserId,
  postId,
  likes,
  commentNumber,
}: {
  currentUserId: string;
  postId: string;
  likes: string[];
  commentNumber: number;
}) => {
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: likes.includes(currentUserId),
  });

  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );

  const likeAction = async () => {
    switchOptimisticLike("");
    try {
      await handleLike(postId);
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between text-sm my-4">
      <div className="flex gap-8">
        <div className="flex items-centet gap-4 bg-slate-50 p-2 rounded-xl">
          <form action={likeAction}>
            <button>
              <Image
                src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
                alt="like"
                width={20}
                height={20}
                className="w-5 h-5 cursor-pointer"
              />
            </button>
          </form>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {optimisticLike.likeCount}
            <span className="hidden md:inline"> Likes</span>
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
            {commentNumber}
            <span className="hidden md:inline"> Comments</span>
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
            <span className="hidden md:inline"> Share</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;

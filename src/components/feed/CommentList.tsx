"use client";

import React, { use, useOptimistic, useState } from "react";
import Image from "next/image";
import { Comment, User } from "@prisma/client";
import { handleAddComment } from "@/lib/actions";

type CommentWithUser = Comment & { user: User };
type CurrentUserType = User & {
  _count: {
    posts: number;
    followers: number;
    followings: number;
  };
};

const CommentList = ({
  comments,
  postId,
  currentUser,
}: {
  comments: CommentWithUser;
  postId: string;
  currentUser: CurrentUserType;
}) => {
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentWithUser) => [value, ...state]
  );

  const addComment = async () => {
    if (!desc) return;

    try {
      addOptimisticComment({
        id: Math.random(),
        description: desc,
        createAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        userId: currentUser.id,
        postId: postId,
        user: {
          id: currentUser.id,
          username: "Commenting...",
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

      const createdComment = await handleAddComment(postId, desc);
      setCommentState((state) => [createdComment, ...state]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* WRITE */}
      <div className="flex items-center gap-4">
        <Image
          src={currentUser.avatar || "/noAvatar.png"}
          alt="profile"
          width={32}
          height={32}
          className="w-8 h-8 object-cover rounded-full"
        />
        <form
          action={addComment}
          className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
        >
          <input
            type="text"
            placeholder="Wrie a comment..."
            className="bg-transparent outline-none flex-1"
            onChange={(e) => setDesc(e.target.value)}
          />
          <Image
            src="/emoji.png"
            alt="emoji"
            width={16}
            height={16}
            className="w-4 h-4 object-cover rounded-full cursor-pointer"
          />
        </form>
      </div>
      {/* COMMENTS */}
      {optimisticComments.map((comment) => (
        <div className="" key={comment.id}>
          {/* COMMENT */}
          <div className="flex gap-4 justify-between mt-6">
            {/* AVATAR */}
            <Image
              src={comment.user.avatar || "/noAvatar.png"}
              alt="profile"
              width={40}
              height={40}
              className="w-10 h-10 object-cover rounded-full"
            />
            {/* DESCRIPTION */}
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-medium">
                {" "}
                {comment.user.name && comment.user.surname
                  ? comment.user.name + " " + comment.user.surname
                  : comment.user.username}
              </span>
              <p>{comment.description}</p>
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
      ))}
    </>
  );
};

export default CommentList;

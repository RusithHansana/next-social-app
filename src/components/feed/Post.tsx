import Image from "next/image";
import React, { Suspense } from "react";
import Comments from "./Comments";
import { Post as TPost, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";
import { getCurrentUser } from "@/lib/getCurrentUser";
import LoadingSpinner from "../LoadingSpinner";
import PostInfo from "./PostInfo";

type PostType = TPost & { user: User } & { likes: [userId: string] } & {
  _count: { comments: number };
};

const Post = async ({ post }: { post: PostType }) => {
  const currentUser = await getCurrentUser();
  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            alt="profile"
            width={40}
            height={40}
            className="w-10 h-10 object-cover rounded-full"
          />
          <span className="font-medium">
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username}
          </span>
        </div>
        {currentUser.id === post.userId && <PostInfo postId={post.id} />}
      </div>
      {/* DESCRIPTION */}
      <div className="flex flex-col gap-4">
        <p>{post.description}</p>
        {post.img && (
          <div className="w-full min-h-96 relative">
            <Image
              src={post.img}
              alt="post image"
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
      </div>
      <Suspense fallback={<LoadingSpinner type="primary" />}>
        {/* INTERACTION */}
        <PostInteraction
          currentUserId={currentUser.id}
          postId={post.id}
          likes={post.likes}
          commentNumber={post._count.comments}
        />
      </Suspense>
      <Suspense fallback={<LoadingSpinner type="primary" />}>
        <Comments postId={post.id} />
      </Suspense>
    </div>
  );
};

export default Post;

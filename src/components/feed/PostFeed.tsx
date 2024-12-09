import React from "react";
import Post from "./Post";
import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/client";

const PostFeed = async ({ username }: { username?: string }) => {
  const currentUser = await getCurrentUser();

  let posts: any[] = [];

  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          username: username,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createAt: "desc",
      },
    });
  }

  if (!username && currentUser) {
    const following = await prisma.follower.findMany({
      where: {
        followerId: currentUser.id,
      },
      select: {
        followingId: true,
      },
    });

    const followingIds = following.map((follow) => follow.followingId);

    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: followingIds,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createAt: "desc",
      },
    });
  }
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      {posts?.length ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default PostFeed;

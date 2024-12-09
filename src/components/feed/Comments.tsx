import React from "react";
import Image from "next/image";
import prisma from "@/lib/client";
import CommentList from "./CommentList";
import { getCurrentUser } from "@/lib/getCurrentUser";

const Comments = async ({ postId }: { postId: string }) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
  });

  const currentUser = await getCurrentUser();

  return (
    <>
      <CommentList
        comments={comments}
        postId={postId}
        currentUser={currentUser}
      />
    </>
  );
};

export default Comments;

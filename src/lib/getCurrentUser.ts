import { auth } from "@clerk/nextjs/server";
import prisma from "./client";

export async function getCurrentUser() {
  const { userId } = auth();

  if (!userId) throw new Error("Please log in to continue");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });

  if (!user) throw new Error("User not found");

  return user;
}

"use server";

import prisma from "./client";
import { getCurrentUser } from "./getCurrentUser";

export const handleFollowSwitch = async (userId: string) => {
  const currentUser = await getCurrentUser();

  try {
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUser.id,
        followingId: userId,
      },
    });

    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUser.id,
          recieverId: userId,
        },
      });

      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: currentUser.id,
            recieverId: userId,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};

export const handleBlockSwitch = async (userId: string) => {
  const currentUser = await getCurrentUser();

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUser.id,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUser.id,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};

export const handleFollowRequest = async (userId: string) => {
  const currentUser = await getCurrentUser();

  try {
    const existingRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        recieverId: currentUser.id,
      },
    });

    if (existingRequest)
      await prisma.followRequest.delete({
        where: {
          id: existingRequest.id,
        },
      });

    await prisma.follower.create({
      data: {
        followerId: userId,
        followingId: currentUser.id,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};

export const handleDeclineRequest = async (userId: string) => {
  const currentUser = await getCurrentUser();

  try {
    const existingRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        recieverId: currentUser.id,
      },
    });

    if (existingRequest)
      await prisma.followRequest.delete({
        where: {
          id: existingRequest.id,
        },
      });
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};

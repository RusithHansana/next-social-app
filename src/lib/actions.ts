"use server";

import { z } from "zod";
import prisma from "./client";
import { getCurrentUser } from "./getCurrentUser";
import { revalidatePath } from "next/cache";

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

export const updateProfile = async (
  prevState: { success: boolean; error: boolean },
  payload: { formData: FormData; cover: string }
) => {
  const { formData, cover } = payload;

  const currentUser = await getCurrentUser();

  if (!currentUser) return { success: false, error: true };

  const fields = { ...Object.fromEntries(formData), cover };

  const filtereFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );

  const Profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(60).optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(255).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
  });

  const validatedFields = Profile.safeParse(filtereFields);

  if (validatedFields.error) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true };
  }

  try {
    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: validatedFields.data,
    });

    return { success: true, error: false };
  } catch (error) {
    console.log(error);
  }
};

export const handleLike = async (postId: string) => {
  const currentUser = await getCurrentUser();

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId: currentUser.id,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          userId: currentUser.id,
          postId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};

export const handleAddComment = async (postId: string, description: string) => {
  const currentUser = await getCurrentUser();

  try {
    const createdComment = await prisma.comment.create({
      data: {
        description,
        postId,
        userId: currentUser.id,
      },
      include: {
        user: true,
      },
    });

    return createdComment;
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};

export const handleAddPost = async (formData: FormData, image: string) => {
  const desc = formData.get("desc") as string;

  const Desc = z.string().min(1).max(255);

  const validatedDesc = Desc.safeParse(desc);

  if (validatedDesc.error) {
    console.log(validatedDesc.error.flatten().fieldErrors);
    return;
  }

  if (!desc) return;

  const currentUser = await getCurrentUser();

  try {
    await prisma.post.create({
      data: {
        description: validatedDesc.data,
        userId: currentUser.id,
        img: image,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};

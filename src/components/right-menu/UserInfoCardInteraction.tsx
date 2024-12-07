"use client";
import { handleBlockSwitch, handleFollowSwitch } from "@/lib/actions";
import React, { useOptimistic, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

interface UserInfoCardInteractionProps {
  userId: string;
  currentUserId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
}

const UserInfoCardInteraction = ({
  userId,
  currentUserId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: UserInfoCardInteractionProps) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    followingSent: isFollowingSent,
    blocked: isUserBlocked,
    sendingFollow: false,
    sendingBlocked: false,
  });

  const handleFollow = async () => {
    switchOptimisticState("follow");
    try {
      await handleFollowSwitch(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingSent: !prev.following && !prev.followingSent ? true : false,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const hanldeBlock = async () => {
    switchOptimisticState("block");
    try {
      await handleBlockSwitch(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            followingSent:
              !state.following && !state.followingSent ? true : false,
            sendingFollow: true,
          }
        : {
            ...state,
            blocked: !state.blocked,
            sendingBlocked: true,
          }
  );

  return (
    <div className="flex flex-col gap-4">
      <form action={handleFollow}>
        <button className="w-full bg-blue-500 text-white p-2 text-sm rounded-md">
          {optimisticState.following ? (
            "Unfollow"
          ) : !!optimisticState.sendingFollow ? (
            <LoadingSpinner type="surface" />
          ) : optimisticState.followingSent ? (
            "Following Request Sent"
          ) : (
            "Follow"
          )}
        </button>
      </form>
      <form action={hanldeBlock} className="self-end">
        <button className="text-red-400 text-xs cursor-pointer">
          {optimisticState.blocked ? (
            "Unblock User"
          ) : !!optimisticState.sendingBlocked ? (
            <LoadingSpinner type="danger" />
          ) : (
            "Block User"
          )}
        </button>
      </form>
    </div>
  );
};

export default UserInfoCardInteraction;

"use client";

import React, { useOptimistic, useState } from "react";
import Image from "next/image";
import { FollowRequest, User } from "@prisma/client";
import { handleDeclineRequest, handleFollowRequest } from "@/lib/actions";

type RequestWithUser = FollowRequest & { sender: User };

const FriendRequestList = ({ requests }: { requests: RequestWithUser[] }) => {
  const [requestState, setRequestState] = useState(requests);

  const [optimisticRequest, setOptimisticRequest] = useOptimistic(
    requestState,
    (state, value: string) => state.filter((req) => req.id !== value)
  );

  const handleAccept = async (requestId: string, userId: string) => {
    setOptimisticRequest(requestId);
    try {
      await handleFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = async (requestId: string, userId: string) => {
    setOptimisticRequest(requestId);
    try {
      await handleDeclineRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {optimisticRequest.map((request) => (
        <div className="flex items-center justify-between" key={request.id}>
          <div className="flex gap-4 items-center justify-between">
            <Image
              src={request.sender.avatar || "/noAvatar.png"}
              alt="user"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">
              {request.sender.name && request.sender.surname
                ? request.sender.name + " " + request.sender.surname
                : request.sender.username}
            </span>
          </div>
          <div className="flex gap-3 items-center justify-end">
            <form action={() => handleAccept(request.id, request.sender.id)}>
              <button>
                <Image
                  src="/accept.png"
                  alt="user"
                  width={20}
                  height={20}
                  className="w-5 h-5 cursor-pointer"
                />
              </button>
            </form>
            <form action={() => handleDecline(request.id, request.sender.id)}>
              <button>
                <Image
                  src="/reject.png"
                  alt="user"
                  width={20}
                  height={20}
                  className="w-5 h-5 cursor-pointer"
                />
              </button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};

export default FriendRequestList;

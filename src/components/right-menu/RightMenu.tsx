import React, { Suspense } from "react";
import FriendRequests from "./FriendRequests";
import Birthdays from "./Birthdays";
import Advertisements from "../Advertisements";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import { User } from "@prisma/client";

const RightMenu = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col gap-6">
      {user && (
        <>
          <Suspense fallback="loading...">
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback="loading...">
            <UserMediaCard user={user} />
          </Suspense>
        </>
      )}
      <FriendRequests />
      <Birthdays />
      <Advertisements size="md" />
    </div>
  );
};

export default RightMenu;

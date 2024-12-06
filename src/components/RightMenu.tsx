import React from "react";
import FriendRequests from "./FriendRequests";
import Birthdays from "./Birthdays";
import Advertisements from "./Advertisements";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import { User } from "@prisma/client";

const RightMenu = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col gap-6">
      {user && (
        <>
          <UserInfoCard user={user} />
          <UserMediaCard user={user} />
        </>
      )}
      <FriendRequests />
      <Birthdays />
      <Advertisements size="md" />
    </div>
  );
};

export default RightMenu;

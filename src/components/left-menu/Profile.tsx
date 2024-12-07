import { getCurrentUser } from "@/lib/getCurrentUser";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Profile = async () => {
  const user = await getCurrentUser();
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
      <div className="h-20 relative">
        <Image
          src={user.cover || "/noCover.png"}
          alt="cover"
          fill
          className="rounded-md object-cover"
        />
        <Image
          src={user.avatar || "/noAvatar.png"}
          alt="profile"
          width={48}
          height={48}
          className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
        />
      </div>
      <div className="h-20 flex flex-col gap-2 items-center">
        <span className="font-semibold">
          {user.name && user.surname
            ? user.name + " " + user.surname
            : user.username}
        </span>
        <div className="flex items-center gap-4 ">
          <div className="flex">
            <Image
              src="https://picsum.photos/id/64/200/300"
              alt="profile"
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />
            <Image
              src="https://picsum.photos/id/64/200/300"
              alt="profile"
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />
            <Image
              src="https://picsum.photos/id/64/200/300"
              alt="profile"
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />
          </div>
          <span className="text-gray-500 text-xs">
            {" "}
            {user._count.followers} Followers
          </span>
        </div>
        <Link
          href={`/profile/${user.username}`}
          className="bg-blue-500 text-white text-xs rounded-md p-2"
        >
          My Profile
        </Link>
      </div>
    </div>
  );
};

export default Profile;

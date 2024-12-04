import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserInfoCard = ({ userId }: { userId: string }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href="/" className="text-blue-500">
          See All
        </Link>
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">Jhon Stewert</span>
          <span className="text-sm">@jhon_stewert</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          nulla maiores dolorum repudiandae minus tempore quia odio, consequatur
          assumenda recusandae enim placeat expedita magnam, nobis reiciendis
          commodi similique illum amet!
        </p>
        <div className="flex items-center gap-2">
          <Image src="/map.png" alt="map" width={16} height={16} />
          <span>
            Living in <strong>Denver</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/school.png" alt="map" width={16} height={16} />
          <span>
            Went to <strong>Denver High School</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/work.png" alt="map" width={16} height={16} />
          <span>
            Works at <strong>Denver Software</strong>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Image src="/link.png" alt="map" width={16} height={16} />
            <Link href="/" className="text-blue-500 font-medium">
              jhonssssstew.com
            </Link>
          </div>
          <div className="flex gap-2 items-center">
            <Image src="/date.png" alt="map" width={16} height={16} />
            <span>joined November 2024</span>
          </div>
        </div>
        <button className="bg-blue-500 text-white text-sm rounded-md p-2">
          Follow
        </button>
        <span className="text-red-500 self-end text-xs cursor-pointer">
          Block User
        </span>
      </div>
    </div>
  );
};

export default UserInfoCard;

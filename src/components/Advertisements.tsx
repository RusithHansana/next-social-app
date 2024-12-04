import Image from "next/image";
import React from "react";

interface Size {
  size: "sm" | "md" | "lg";
}

const Advertisements = ({ size }: Size) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      {/* TOP */}
      <div className="flex items-center justify-between text-gray-500 font-medium">
        <span>Sponsored Ads</span>
        <Image src="/more.png" alt="more" width={16} height={16} />
      </div>
      {/* BOTTOM */}
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`relative w-full ${
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
          }`}
        >
          <Image
            src="https://picsum.photos/200/300"
            alt="more"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="https://picsum.photos/200/300"
            alt="more"
            width={24}
            height={24}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-blue-500 font-medium">Waterfall Resort</span>
        </div>
        <p className={size === "sm" ? "text-xs" : "text-sm"}>
          {size === "sm"
            ? "Lorem ipsum dolor sit amet consectetur adipisicing elit."
            : size === "md"
            ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, aperiam cum vitae tempore excepturi consequatur amet sunt."
            : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis reprehenderit, et laudantium officia libero dolores eligendi. Esse veniam quis ipsam vero deserunt eaque, tempore ab non sint, hic ratione modi?"}
        </p>
        <button className="bg-gray-200 text-gray-500 text-xs rounded-lg p-2">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Advertisements;

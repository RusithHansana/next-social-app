"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { CldUploadWidget } from "next-cloudinary";
import AddPostButton from "./AddPostButton";
import { handleAddPost } from "@/lib/actions";

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState<any>();

  if (!isLoaded) return <LoadingSpinner type="primary" />;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* AVATAR */}
      <Image
        src={user?.imageUrl || "/noAvatar.png"}
        alt="profile"
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full"
      />
      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form
          action={(formData) =>
            handleAddPost(formData, image?.secure_url || "")
          }
          className="flex gap-4"
        >
          <textarea
            name="desc"
            id="desc"
            placeholder="What's on your mind?"
            className="flex-1 bg-slate-100 rounded-lg p-2"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className="">
            <Image
              src="/emoji.png"
              alt="emoji"
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer self-end"
            />
            <AddPostButton />
          </div>
        </form>
        {/* POST OPTIONS */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <CldUploadWidget
            uploadPreset="Social-App"
            onSuccess={(result, { widget }) => {
              setImage(result.info);
              widget.close();
            }}
          >
            {({ open }) => (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => open()}
              >
                <Image
                  src="/addimage.png"
                  alt="add photo"
                  width={20}
                  height={20}
                  className="w-5 h-5 cursor-pointer self-end"
                />
                Photo
              </div>
            )}
          </CldUploadWidget>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addVideo.png"
              alt="add video"
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer self-end"
            />
            Video
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/poll.png"
              alt="create poll"
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer self-end"
            />
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addevent.png"
              alt="add event"
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer self-end"
            />
            Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;

"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useActionState, useState } from "react";

const UpdateUser = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cover, setCover] = useState<any>();

  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
  });

  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    state.success && router.refresh();
  };

  return (
    <div className="">
      <span
        className="text-blue-500 text-sm cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Update
      </span>
      {isOpen && (
        <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
          <form
            action={(formData) =>
              formAction({ formData, cover: cover?.secure_url || "" })
            }
            className="p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative"
          >
            {/* TITLE */}
            <h1>Update Profile</h1>
            <div className="mt-4 text-xs text-gray-500">
              Use Profile in the navbar to update username and avatar.
            </div>
            {/* COVER PICTURE UPLOAD */}
            <CldUploadWidget
              uploadPreset="Social-App"
              onSuccess={(result) => setCover(result.info)}
            >
              {({ open }) => (
                <div
                  className="flex flex-col gap-4 my-4"
                  onClick={() => open()}
                >
                  <label htmlFor="">Cover Picture</label>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Image
                      src={user.cover || "/noCover.png"}
                      alt="cover"
                      width={96}
                      height={64}
                      className="w-24 h-16 rounded-md object-cover"
                    />
                    <span className="text-xm underline text-gray-500">
                      Change
                    </span>
                  </div>
                </div>
              )}
            </CldUploadWidget>
            {/* WRAPPER */}
            <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
              {/* INPUTS */}
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  First Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="p-[13px] ring-1 ring-gray-300 rounded-md"
                  placeholder={user.name || "John"}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Surname
                </label>
                <input
                  type="text"
                  name="surname"
                  className="p-[13px] ring-1 ring-gray-300 rounded-md"
                  placeholder={user.surname || "Doe"}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Description
                </label>
                <textarea
                  name="description"
                  className="p-2 border border-gray-200 rounded-md"
                  placeholder={
                    user.description || "Here is a description about Jhon Doe"
                  }
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Lives in
                </label>
                <input
                  type="text"
                  name="city"
                  className="p-[13px] ring-1 ring-gray-300 rounded-md"
                  placeholder={user.city || "New York"}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Studied in
                </label>
                <input
                  type="text"
                  name="school"
                  className="p-[13px] ring-1 ring-gray-300 rounded-md"
                  placeholder={user.school || "New York University"}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Works at
                </label>
                <input
                  type="text"
                  name="work"
                  className="p-[13px] ring-1 ring-gray-300 rounded-md"
                  placeholder={user.work || "Social Media"}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="text-xs text-gray-500">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  className="p-[13px] ring-1 ring-gray-300 rounded-md"
                  placeholder={user.website || "https://user.com"}
                />
              </div>
            </div>
            <button className="bg-blue-500 text-white rounded-md p-2">
              Update
            </button>
            {state.success && (
              <span className="text-green-500">Profile has been updated</span>
            )}
            {state.error && <span className="text-red-500">Update Failed</span>}
            <div
              className="absolute text-xl right-4 top-3 cursor-pointer"
              onClick={handleClose}
            >
              X
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;

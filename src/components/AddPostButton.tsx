"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import LoadingSpinner from "./LoadingSpinner";

const AddPostButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed rounded-md p-2 mt-2 text-white"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner type="surface" />
          Posting
        </div>
      ) : (
        "Post"
      )}
    </button>
  );
};

export default AddPostButton;

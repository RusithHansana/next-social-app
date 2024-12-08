"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import LoadingSpinner from "../LoadingSpinner";

const UpdateButton = () => {
  const { pending } = useFormStatus();
  return (
    <button className="bg-blue-500 text-white rounded-md p-2">
      {pending && <LoadingSpinner type="surface" />}
      <span> Update</span>
    </button>
  );
};

export default UpdateButton;

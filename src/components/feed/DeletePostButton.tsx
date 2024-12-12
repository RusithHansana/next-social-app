"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import LoadingSpinner from "../LoadingSpinner";

const DeletePostButton = () => {
  const { pending } = useFormStatus();
  return (
    <button className="text-red-500">
      {pending && <LoadingSpinner type="danger" />}
      <span> {pending ? "Deleting" : "Delete"}</span>
    </button>
  );
};

export default DeletePostButton;

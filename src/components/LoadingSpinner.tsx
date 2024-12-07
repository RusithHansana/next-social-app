import React from "react";

const LoadingSpinner = ({
  type,
}: {
  type: "primary" | "danger" | "surface";
}) => {
  return (
    <div
      className={`inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-${type} motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default LoadingSpinner;

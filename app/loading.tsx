import React from "react";

const HomeLoading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <progress className="progress w-56 progress-primary"></progress>
    </div>
  );
};

export default HomeLoading;

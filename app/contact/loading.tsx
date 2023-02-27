import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <progress className="progress w-56"></progress>
    </div>
  );
};

export default loading;

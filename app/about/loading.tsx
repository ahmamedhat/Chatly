import React from "react";
import Skeleton from "react-loading-skeleton";

const loading = () => {
  return (
    <div className="bg-white dark:bg-dark h-screen">
      <Skeleton
        baseColor="#10171E"
        highlightColor="#15202B"
        className="h-6 mb-4 "
      />
      <Skeleton
        baseColor="#10171E"
        highlightColor="#15202B"
        className="h-24 mb-2"
      />
      <Skeleton baseColor="#10171E" highlightColor="#15202B" className="h-24" />
    </div>
  );
};

export default loading;

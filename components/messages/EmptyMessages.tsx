import React from "react";

interface IEmptyMessages {
  title: string;
  descriptipon: string;
}

const EmptyMessages: React.FC<IEmptyMessages> = ({ title, descriptipon }) => {
  return (
    <div className="flex justify-center flex-col items-center text-center">
      <p className="font-semibold text-lg">{title}</p>
      <p className="font-extralight text-sm">{descriptipon}</p>
    </div>
  );
};

export default EmptyMessages;

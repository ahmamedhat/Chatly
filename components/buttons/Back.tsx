import { IconsSizes } from "@/lib/constants";
import { useRouter } from "next/navigation";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

interface IBackButton extends React.HTMLAttributes<HTMLButtonElement> {}

const BackButton: React.FC<IBackButton> = ({ ...props }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="dark:outline-secondaryMessage fill-dark dark:fill-secondaryMessage"
      {...props}
    >
      <IoArrowBack size={IconsSizes.lg} className="fill-white" />
    </button>
  );
};

export default BackButton;

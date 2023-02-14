import { IconsSizes } from "@/lib/constants";
import { useRouter } from "next/navigation";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

interface IBackButton {
  href: string;
}

const BackButton: React.FC<IBackButton> = ({ href }) => {
  const router = useRouter();
  const navigate = () => {
    router.replace(href);
  };
  return (
    <button
      onClick={navigate}
      className="dark:outline-secondaryMessage fill-dark dark:fill-secondaryMessage"
    >
      <IoArrowBack size={IconsSizes.xl} className="fill-white" />
    </button>
  );
};

export default BackButton;

import { IconsSizes } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

interface IBackButton {
  href: string;
}

const BackButton: React.FC<IBackButton> = ({ href }) => {
  return (
    <Link href={href ?? "/"}>
      <IoArrowBack
        size={IconsSizes.lg}
        className="fill-dark dark:fill-secondaryMessage"
      />
    </Link>
  );
};

export default BackButton;

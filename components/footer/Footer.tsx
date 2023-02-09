"use client";

import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { IconsSizes } from "@/lib/constants";

export default function Footer() {
  return (
    <div className="bg-white dark:bg-dark">
      <footer className="footer footer-center p-10 text-base-content rounded bg-white dark:bg-dark">
        <div className="grid grid-flow-col gap-4">
          <Link href={"/about"}>
            <p className="link link-hover">About us</p>
          </Link>
          <Link href={"/contact"}>
            <p className="link link-hover">Contact</p>
          </Link>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <FaGithub
              size={IconsSizes.lg}
              className="cursor-pointer hover:fill-primaryMessage"
            />
            <FaFacebook
              size={IconsSizes.lg}
              className="cursor-pointer hover:fill-primaryMessage"
            />
            <FaTwitter
              size={IconsSizes.lg}
              className="cursor-pointer hover:fill-primaryMessage"
            />
          </div>
        </div>
        <div>
          <p>Copyright © 2023 - All right reserved by Chatly</p>
        </div>
      </footer>
    </div>
  );
}

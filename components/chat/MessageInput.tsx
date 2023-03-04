"use client";

import { IconsSizes } from "@/lib/constants";
import { socketActions } from "@/lib/redux/reducers/socketSlice";
import clsx from "clsx";
import React, { useState } from "react";
import { TbSend } from "react-icons/tb";
import { useDispatch } from "react-redux";

interface IMessageInput {
  uid: string;
  onSendHandler: (message: string) => void;
}

const MessageInput = ({ onSendHandler, uid }: IMessageInput) => {
  const [messageInput, setMessageInput] = useState<string>("");
  const dispatch = useDispatch();

  const onInputChange = (value: string) => {
    setMessageInput(value);
    dispatch(socketActions.sendTyping({ room: uid }));
  };

  return (
    <div className="fixed mx-auto left-2 right-2 bottom-4 max-w-[60rem]">
      <input
        type="text"
        value={messageInput}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Write your message..."
        className="pr-10 input w-full bg-lightTextInput dark:bg-darkTextInput text-offBlack dark:text-secondaryMessage"
        onKeyDown={(event) => {
          if (event.key == "Enter") {
            onSendHandler(messageInput);
            setMessageInput("");
          }
        }}
        required={true}
      />

      <TbSend
        size={IconsSizes.lg}
        className={clsx(
          "absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer duration-200 select-none transition rounded-full p-1 stroke-white",
          {
            "dark:bg-darkMessage bg-gray-500": messageInput.trim().length < 1,
            "bg-primaryMessage": messageInput.trim().length > 0,
          }
        )}
        onClick={() => {
          onSendHandler(messageInput);
          setMessageInput("");
        }}
      />
    </div>
  );
};

export default MessageInput;

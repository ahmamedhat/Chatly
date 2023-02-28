"use client";

import { ChatMessage, User } from "@/types/typings";
import { ChatMessage as ChatMessageComponent } from "@/components";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socketActions } from "@/lib/redux/reducers/socketSlice";
import { RootState } from "@/lib/redux/store";
import { TbSend } from "react-icons/tb";
import { IconsSizes } from "@/lib/constants";
import clsx from "clsx";

interface IChatMessages {
  currentUser: User;
  onlineUserID: string;
}

const ChatMessages = ({ currentUser, onlineUserID }: IChatMessages) => {
  const dispatch = useDispatch();
  const chatsState = useSelector((store: RootState) => store.socket.chats);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");

  const chatList = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (currentUser) {
      dispatch(socketActions.startConnecting());
      return () => {
        dispatch(socketActions.disconnect());
      };
    }
  }, []);

  useEffect(() => {
    chatList.current?.scrollIntoView({ behavior: "smooth" });
    chatsState?.length && setChatMessages(chatsState[0]?.messages);
  }, [chatsState[0]?.messages]);

  const sendMessage = () => {
    if (messageInput.trim().length < 1) return;
    const newMessage: ChatMessage = {
      message: messageInput,
      id: Date.now(),
      receiverId: onlineUserID ?? "2",
      senderId: currentUser.id ?? "1",
      time: Date().toString(),
    };

    const uid =
      newMessage.senderId === currentUser?.id
        ? newMessage.receiverId
        : newMessage.senderId;
    dispatch(
      socketActions.submitMessage({
        message: newMessage,
        room: onlineUserID as string,
      })
    );
    dispatch(socketActions.receiveMessage({ message: newMessage, uid }));
    setChatMessages([...chatMessages, newMessage]);
    setMessageInput("");
  };

  return (
    <div className="overflow-y-scroll pt-24 pb-14">
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessageComponent
            currentUserId={currentUser.id ?? "1"}
            id={chatMessage.id}
            message={chatMessage.message}
            receiverId={chatMessage.receiverId}
            senderId={chatMessage.senderId}
            time={chatMessage.time}
            key={chatMessage.id}
          />
        );
      })}
      <div className="my-auto" />
      <div ref={chatList} />
      <div className="fixed mt-4 mx-auto left-2 right-2 bottom-4 max-w-[60rem]">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Write your message..."
          className="input w-full bg-lightTextInput dark:bg-darkTextInput text-offBlack dark:text-secondaryMessage"
          onKeyDown={(event) => {
            if (event.key == "Enter") sendMessage();
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
          onClick={sendMessage}
        />
      </div>
    </div>
  );
};

export default ChatMessages;

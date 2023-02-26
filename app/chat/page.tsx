"use client";

import { ChatHeader, ChatMessage as ChatMessageComponent } from "@/components";
import { ChatMessages, IconsSizes } from "@/lib/constants";
import { socketActions } from "@/lib/redux/reducers/socketSlice";
import { RootState } from "@/lib/redux/store";
import { ChatMessage } from "@/types/typings";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { TbSend } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

export default function Chat() {
  const chatsState = useSelector((store: RootState) => store.socket.chats);
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState(ChatMessages);
  const dispatch = useDispatch();
  const chatList = useRef<null | HTMLDivElement>(null);
  const user = useSelector((store: RootState) => store.user.user);
  const { data: session } = useSession();
  const onlineUser = {
    id: useSearchParams().get("userID"),
    name: useSearchParams().get("username"),
  };

  useEffect(() => {
    chatList.current?.scrollIntoView({ behavior: "smooth" });
    if (session?.user) {
      dispatch(socketActions.startConnecting());
      return () => {
        dispatch(socketActions.disconnect());
      };
    }
  }, []);

  useEffect(() => {
    console.log("changed", chatsState[0]?.messages);
    console.log("my user id is", user.id);
    console.log("reciver id", onlineUser.id!);

    chatsState?.length && setChatMessages(chatsState[0]?.messages);
  }, [chatsState[0]?.messages]);

  const sendMessage = () => {
    if (messageInput.trim().length < 1) return;
    const newMessage: ChatMessage = {
      message: messageInput,
      id: Date.now(),
      receiverId: onlineUser.id! ?? 1,
      senderId: user?.id,
      time: Date().toString(),
    };

    const uid =
      newMessage.senderId === user?.id
        ? newMessage.receiverId
        : newMessage.senderId;
    dispatch(
      socketActions.submitMessage({
        message: newMessage,
        room: onlineUser.id as string,
      })
    );
    dispatch(socketActions.receiveMessage({ message: newMessage, uid }));
    setChatMessages([...chatMessages, newMessage]);
    setMessageInput("");

    // const [getUser, { loading, error, data }] = useLazyQuery(GET_USER, {
    //   variables: { email: session?.user?.email },
    // });
  };

  useEffect(() => {
    chatList.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className="bg-white dark:bg-dark h-screen absolute inset-0">
      <div className="max-w-[60rem] flex flex-col justify-between pb-6 mx-auto h-full ">
        <ChatHeader userName={onlineUser.name ?? "online user"} />
        <div className="overflow-y-scroll pt-24 pb-14">
          {chatMessages.map((chatMessage) => {
            return (
              <ChatMessageComponent
                currentUserId={user.id}
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
        </div>

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
            className={`absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer duration-200 select-none transition ${
              messageInput.trim().length < 1
                ? "dark:bg-darkMessage bg-gray-500"
                : "bg-primaryMessage"
            }  rounded-full p-1 stroke-white`}
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}

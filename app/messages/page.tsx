"use client";

import { PersonChat, PersonOnline } from "@/components";
import { Chats } from "@/lib/constants";
import { setSocket } from "@/lib/redux/reducers/socketSlice";
import userSlice, { setUser } from "@/lib/redux/reducers/userSlice";
import { RootState } from "@/lib/redux/store";
import { getConnectedUsers, socketConnect } from "@/lib/socket/socket";
import { PersonOnlineMessage } from "@/typings";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

export default function Messages() {
  const dispatch = useDispatch();
  const user = useSelector((store: RootState) => store.user.user);
  const [chats, setChats] = useState(Chats);
  const [onlineUsers, setOnlineUsers] = useState<PersonOnlineMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("online users are", onlineUsers);
    if (session?.user && !user?.email) {
      dispatch(
        setUser({
          id: 0,
          email: session?.user?.email as string,
          image: session?.user?.image as string,
          name: session?.user?.name as string,
        })
      );
    } else if (session?.user && user.email) {
      const socketObj = socketConnect(user);
      dispatch(setSocket(socketObj));
      getConnectedUsers(socketObj, (users) => setOnlineUsers(users));

      return () => {
        console.log("socket? disconnected");
        socketObj?.disconnect();
      };
    }
  }, [session?.user, user]);

  return (
    <div className="bg-white dark:bg-dark py-2">
      <div className="max-w-[50rem] mx-auto">
        <h2 className="font-semibold text-lg mb-4 text-offBlack dark:text-white">
          Messages
        </h2>
        {chats.map((chat) => {
          return (
            <PersonChat
              key={chat.id}
              name={chat.name}
              id={chat.id}
              message={chat.message}
              time={chat.time}
              image={chat.image}
              chatID={chat.chatID}
            />
          );
        })}
      </div>
      <div className="max-w-[50rem] mx-auto mt-4">
        <h2 className="font-semibold text-lg mb-4 text-offBlack dark:text-white">
          Online
        </h2>
        {onlineUsers.map((user) => {
          return (
            <PersonOnline
              key={user.userID}
              username={user.username}
              image={user.image}
              email={user.email}
              userID={user.userID}
            />
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { PersonChat } from "@/components";
import { Chats } from "@/lib/constants";
import { setSocket } from "@/lib/redux/reducers/socketSlice";
import { RootState } from "@/lib/redux/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

export default function Messages() {
  const dispatch = useDispatch();

  const user = useSelector((store: RootState) => store.user.user);
  const socket = useSelector((store: RootState) => store.socket.socket);
  const [chats, setChats] = useState(Chats);
  const { data: session, status } = useSession();

  const getConnectedUsers = (socket: Socket) => {
    socket?.on("users", (users: any) => {
      console.log("users connected are", users);

      users.forEach((user: any) => {
        user.self = user.userID === socket?.id;
        // initReactiveProperties(user);
      });
      // put the current user first, and then sort by username
      users = users.sort(
        (
          a: { self: any; username: number },
          b: { self: any; username: number }
        ) => {
          if (a.self) return -1;
          if (b.self) return 1;
          if (a.username < b.username) return -1;
          return a.username > b.username ? 1 : 0;
        }
      );
    });
  };

  useEffect(() => {
    const socketObj = io("http://localhost:4000", { autoConnect: false });
    socketObj.auth = { username: user.name };
    socketObj.connect();
    dispatch(setSocket(socketObj));
    console.log("socket is", socket);

    socketObj?.on("connect", () => {
      console.log("you connected app with socketObj? id: ", socketObj?.id);
    });
    socketObj?.on("new user connected", (user) => {
      console.log("a new user has connected", user?.userID);
    });
    socketObj?.on("receive-message", (socketObj) => {
      console.log("app socketObj? message is", socketObj);
    });
    socketObj.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        console.log("invalid username");
      }
    });
    getConnectedUsers(socketObj);

    return () => {
      console.log("socket? disconnected");
      socketObj?.disconnect();
    };
  }, []);
  if (status === "unauthenticated") {
  }

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
    </div>
  );
}

"use client";

import React from "react";
import EmptyMessages from "./EmptyMessages";
import PersonOnline from "./PersonOnline";
import { socketActions } from "@/lib/redux/reducers/socketSlice";
import { RootState } from "@/lib/redux/store";
import { PersonOnlineMessage } from "@/types/typings";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const OnlineUsers = () => {
  const socket = useSelector((store: RootState) => store.socket);
  const [onlineUsers, setOnlineUsers] = useState<PersonOnlineMessage[]>(
    socket.users
  );
  const dispatch = useDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    console.log("user here", session);
  }, [session]);

  useEffect(() => {
    if (session?.user) {
      dispatch(socketActions.startConnecting());
      return () => {
        dispatch(socketActions.disconnect());
      };
    }
  }, []);

  useEffect(() => {
    setOnlineUsers(socket.users);
  }, [socket.users]);

  return (
    <div className="max-w-[50rem] mx-auto mt-4">
      <h2 className="font-semibold text-lg mb-4 text-gray-600 dark:text-gray-400">
        Online
      </h2>
      {session !== undefined &&
        (session === null ? (
          <EmptyMessages
            title="You're not signed in yet"
            descriptipon="Sign in to start chatting with online users!"
          />
        ) : onlineUsers.length > 0 ? (
          onlineUsers.map((user) => {
            return (
              <PersonOnline
                self={user.self}
                key={user.userID}
                username={user.username}
                image={user.image}
                email={user.email}
                userID={user.userID}
              />
            );
          })
        ) : (
          <EmptyMessages
            title="There is Nobody Active Now"
            descriptipon="Wait until someone joins, or ask a friend to!"
          />
        ))}
    </div>
  );
};

export default OnlineUsers;

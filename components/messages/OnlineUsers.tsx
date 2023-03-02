"use client";

import React from "react";
import EmptyMessages from "./EmptyMessages";
import PersonOnline from "./PersonOnline";
import { socketActions } from "@/lib/redux/reducers/socketSlice";
import { RootState } from "@/lib/redux/store";
import { PersonOnlineMessage, User } from "@/types/typings";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IOnlineUsers {
  currentUser: User;
}

const OnlineUsers = ({ currentUser }: IOnlineUsers) => {
  const socket = useSelector((store: RootState) => store.socket);
  const user = useSelector((store: RootState) => store.user.user);
  const [onlineUsers, setOnlineUsers] = useState<PersonOnlineMessage[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("user here", currentUser);
    console.log("user redux here", user);
    if (currentUser) {
      dispatch(socketActions.startConnecting(currentUser));
      return () => {
        dispatch(socketActions.disconnect());
      };
    }
  }, [currentUser]);

  useEffect(() => {
    setOnlineUsers(socket.users);
  }, [socket.users]);

  return (
    <div className="max-w-[50rem] mx-auto mt-4 h-full">
      <h2 className="font-semibold text-lg mb-4 text-gray-600 dark:text-gray-400">
        Online
      </h2>

      {!currentUser ? (
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
      )}
    </div>
  );
};

export default OnlineUsers;

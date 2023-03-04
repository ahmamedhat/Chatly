"use client";

import { User } from "@/types/typings";
import {
  ChatMessage as ChatMessageComponent,
  MessageInput,
} from "@/components";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socketActions } from "@/lib/redux/reducers/socketSlice";
import { RootState } from "@/lib/redux/store";
import { useMutation } from "@apollo/client";
import { ADD_NEW_MESSAGE } from "@/lib/api/mutation";
import { Chat, Message } from "@/lib/api/gql/graphql";
import moment from "moment";

interface IChatMessages {
  currentUser: User;
  onlineUserID: string;
  chatID?: string;
  chat?: Chat;
}

const ChatMessages = ({ currentUser, onlineUserID, chat }: IChatMessages) => {
  const dispatch = useDispatch();
  const chatsState = useSelector((store: RootState) => store.socket.chats);
  const [chatMessages, setChatMessages] = useState<Message[]>(
    chat?.messages || []
  );
  const chatList = useRef<null | HTMLDivElement>(null);

  const [addNewMessage] = useMutation(ADD_NEW_MESSAGE);

  useEffect(() => {
    if (chat?.messages) {
      dispatch(
        socketActions.receiveAllMessages({
          userID: onlineUserID,
          chat: chat,
        })
      );
    }
    if (currentUser) {
      dispatch(socketActions.startConnecting(currentUser));
      return () => {
        dispatch(socketActions.disconnect());
      };
    }
  }, []);

  useEffect(() => {
    !!chatsState[onlineUserID]?.length &&
      setChatMessages(chatsState[onlineUserID]);
    chatList.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages, chatsState[onlineUserID]]);

  const sendMessage = (messageInput: string) => {
    if (messageInput.trim().length < 1) return;
    try {
      addNewMessage({
        variables: {
          from: currentUser.id,
          to: onlineUserID,
          body: messageInput,
        },
      });
    } catch (e) {
      console.log("an error has occured");
    }

    const newMessage: Message = {
      _id: moment().valueOf().toString(),
      body: messageInput,
      //@ts-ignore
      to: { _id: onlineUserID },
      //@ts-ignore
      from: { _id: currentUser.id, name: currentUser.name },
      createdAt: moment().valueOf().toString(),
    };
    dispatch(
      socketActions.submitMessage({
        message: newMessage,
        room: onlineUserID as string,
      })
    );
    dispatch(
      socketActions.receiveMessage({ message: newMessage, uid: onlineUserID })
    );
    setChatMessages([...chatMessages, newMessage]);
  };

  return (
    <div className="overflow-y-scroll pt-24 pb-14">
      {chatMessages?.map((chatMessage) => {
        return (
          <ChatMessageComponent
            currentUserId={currentUser.id ?? "1"}
            _id={chatMessage._id}
            body={chatMessage.body}
            from={chatMessage.from}
            to={chatMessage.to}
            createdAt={chatMessage.createdAt}
            key={chatMessage._id}
          />
        );
      })}
      <div ref={chatList} className="pb-16" />
      <MessageInput onSendHandler={(message) => sendMessage(message)} />
    </div>
  );
};

export default ChatMessages;

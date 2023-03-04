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
import { ADD_NEW_MESSAGE, MARK_MESSAGE_AS_READ } from "@/lib/api/mutation";
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
  const [markAsRead] = useMutation(MARK_MESSAGE_AS_READ);

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
    if (chatsState[onlineUserID]?.length) {
      setChatMessages(chatsState[onlineUserID]);
      if (chatsState[onlineUserID].slice(-1)[0].from._id === onlineUserID) {
        markAsRead({
          variables: { id: chatsState[onlineUserID].slice(-1)[0]._id },
        });
      }
    }
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
      }).then((data) => {
        dispatch(
          socketActions.submitMessage({
            message: data.data.addNewMessage,
            room: onlineUserID as string,
          })
        );
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
      <MessageInput
        uid={onlineUserID}
        onSendHandler={(message) => sendMessage(message)}
      />
    </div>
  );
};

export default ChatMessages;

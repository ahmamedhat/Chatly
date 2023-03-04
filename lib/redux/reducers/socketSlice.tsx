import { PersonOnlineMessage, User } from "@/types/typings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat as GraphqlChat, Message } from "../../api/gql/graphql";

export interface Chat {
  [key: string]: Message[];
}

export interface Typing {
  [key: string]: boolean;
}

export interface SocketState {
  chats: Chat;
  users: PersonOnlineMessage[];
  typing: Typing;
  isEstablishingConnection: boolean;
  isConnected: boolean;
}

const initialState: SocketState = {
  chats: {},
  users: [],
  typing: {},
  isEstablishingConnection: false,
  isConnected: false,
};

const SocketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    startConnecting: (state, action: PayloadAction<User>) => {
      state.users = [];
      state.typing = {};
      state.isEstablishingConnection = true;
    },
    disconnect: (state) => {
      state.isConnected = false;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },

    receiveAllMessages: (
      state,
      action: PayloadAction<{
        userID: string;
        chat: GraphqlChat;
      }>
    ) => {
      state.chats[action.payload.userID] = action.payload.chat.messages;

      return;
    },
    receiveMessage: (
      state,
      action: PayloadAction<{
        message: Message;
        uid: string;
      }>
    ) => {
      if (Object.hasOwn(state.chats, action.payload.uid)) {
        state.chats[action.payload.uid].push(action.payload.message);
      } else {
        state.chats[action.payload.uid] = [action.payload.message];
      }
    },
    submitMessage: (
      state,
      action: PayloadAction<{
        message: Message;
        room?: string;
      }>
    ) => {
      console.log(state.isConnected, action.payload.room);
      return;
    },
    sendTyping: (
      state,
      action: PayloadAction<{
        room?: string;
      }>
    ) => {
      console.log(state.isConnected, action.payload.room);
      return;
    },
    setTyping: (
      state,
      action: PayloadAction<{
        uid: string;
        value: boolean;
      }>
    ) => {
      state.typing[action.payload.uid] = action.payload.value;
      return;
    },
    saveUsers: (state, action: PayloadAction<PersonOnlineMessage[]>) => {
      state.users = action.payload;
      state.typing = state.users.reduce(function (result: any, item) {
        result[item.userID] = false;
        return result;
      }, {});
    },
  },
});

export const socketActions = SocketSlice.actions;

export default SocketSlice.reducer;

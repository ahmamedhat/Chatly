import { PersonOnlineMessage, User } from "@/types/typings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat as GraphqlChat, Message } from "../../api/gql/graphql";

export interface Chat {
  [key: string]: Message[];
}

export interface SocketState {
  chats: Chat;
  users: PersonOnlineMessage[];
  isEstablishingConnection: boolean;
  isConnected: boolean;
}

const initialState: SocketState = {
  chats: {},
  users: [],
  isEstablishingConnection: false,
  isConnected: false,
};

const SocketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    startConnecting: (state, action: PayloadAction<User>) => {
      state.users = [];
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
      console.log("user is", action.payload.userID);
      console.log("chat is", action.payload.chat);

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
    saveUsers: (state, action: PayloadAction<PersonOnlineMessage[]>) => {
      state.users = action.payload;
    },
  },
});

export const socketActions = SocketSlice.actions;

export default SocketSlice.reducer;

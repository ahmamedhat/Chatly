import { ChatMessage, PersonOnlineMessage, User } from "@/types/typings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Chat {
  userID: string;
  messages: ChatMessage[];
}

export interface SocketState {
  chats: Chat[];
  users: PersonOnlineMessage[];
  isEstablishingConnection: boolean;
  isConnected: boolean;
}

const initialState: SocketState = {
  chats: [],
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
      state.chats = [];
    },

    receiveAllMessages: (
      state,
      action: PayloadAction<{
        messages: ChatMessage[];
      }>
    ) => {
      console.log(state.isConnected, action.payload.messages);
    },
    receiveMessage: (
      state,
      action: PayloadAction<{
        message: ChatMessage;
        uid: string;
      }>
    ) => {
      const chatIndex = state.chats.findIndex((chat) => {
        return chat.userID == action.payload.uid;
      });
      if (chatIndex !== -1) {
        state.chats[chatIndex]?.messages.push(action.payload.message);
      } else {
        state.chats.push({
          userID: action.payload.uid,
          messages: [action.payload.message],
        });
      }
    },
    submitMessage: (
      state,
      action: PayloadAction<{
        message: ChatMessage;
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

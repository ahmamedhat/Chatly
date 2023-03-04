import { Message } from "@/lib/api/gql/graphql";

export type PersonChatMessage = {
  message: Message;
  time: string;
  image?: string;
  chatID: string;
};

export type PersonOnlineMessage = {
  self: boolean;
  userID: string;
  username: string;
  email: string;
  image?: string;
};

export type ChatMessage = {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  time: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export type Icon = {
  height: string;
  width: string;
};

export type ChatConfig = {
  title: string;
  href: string;
};

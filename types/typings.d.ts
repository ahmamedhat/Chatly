export type PersonChatMessage = {
  id: string;
  message: string;
  name: string;
  time: string;
  image: string;
  chatID: number;
};

export type PersonOnlineMessage = {
  self: boolean;
  userID: string;
  username: string;
  email: string;
  image?: string;
};

export type ChatMessage = {
  id: number;
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

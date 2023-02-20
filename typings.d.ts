export type PersonChatMessage = {
  id: number;
  message: string;
  name: string;
  time: string;
  image: string;
  chatID: number;
};

export type PersonOnlineMessage = {
  userID: string;
  username: string;
  email: string;
  image?: string;
};

export type ChatMessage = {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  time: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  image: string;
};

export type Icon = {
  height: string;
  width: string;
};

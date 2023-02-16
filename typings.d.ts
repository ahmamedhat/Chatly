export type PersonChatMessage = {
  id: number;
  message: string;
  name: string;
  time: string;
  image: string;
  chatID: number;
};

export type ChatMessage = {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  time: string;
};

export type user = {
  id: number;
  name: string;
  email: string;
};

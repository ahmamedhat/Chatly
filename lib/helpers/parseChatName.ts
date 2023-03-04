import { Message } from "../api/gql/graphql";

const parseChatName = (message: Message, currentUserId: string) => {
  const user = message.from._id === currentUserId ? message.to : message.from;
  return user;
};

export default parseChatName;

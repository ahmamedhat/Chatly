import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";
import { User } from "@/types/typings";
import { ChatEvents } from "../constants";
import { socketActions } from "./reducers/socketSlice";
import { parseOnlineUsers } from "../helpers";
import { setUser } from "./reducers/userSlice";
import { Chat, Message } from "../api/gql/graphql";
import { toast } from "react-hot-toast";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const chatMiddleware: Middleware = (store) => {
  let socket: Socket;

  return (next) => (action) => {
    const isConnectionEstablished = socket;
    const user: User = store.getState().user.user;

    if (socketActions.startConnecting.match(action)) {
      if (!isConnectionEstablished) {
        store.dispatch(setUser(action.payload));
        socket = io(apiURL as string, { autoConnect: false });
      }

      socket.on("connect", () => {
        store.dispatch(socketActions.connectionEstablished());
        socket.emit(ChatEvents.RequestAllMessages);
      });

      socket.on(ChatEvents.SendAllMessages, (chat: Chat, userID: string) => {
        store.dispatch(socketActions.receiveAllMessages({ userID, chat }));
      });

      socket.on(ChatEvents.ReceiveMessage, (message: Message, uid: string) => {
        if (uid == user.id) uid = message.to._id;
        toast(`${message.from.name}: ${message.body}`);
        store.dispatch(socketActions.receiveMessage({ message, uid }));
      });

      socket.on(ChatEvents.ReceiveTyping, (uid: string) => {
        store.dispatch(socketActions.setTyping({ uid, value: true }));
      });

      socket.on(ChatEvents.AllUsers, (users: []) => {
        const newUsers = parseOnlineUsers(users, user.id);
        store.dispatch(socketActions.saveUsers(newUsers));
      });
      socket.auth = {
        userID: user?.id,
        username: user?.name,
        email: user?.email,
        image: user?.image,
      };
      socket.connect();
    }
    if (socketActions.submitMessage.match(action) && isConnectionEstablished) {
      socket.emit(
        ChatEvents.SendMessage,
        action.payload.message,
        action.payload.room
      );
    }
    if (socketActions.sendTyping.match(action) && isConnectionEstablished) {
      socket.emit(ChatEvents.SendTyping, action.payload.room);
    }
    if (socketActions.disconnect.match(action) && isConnectionEstablished) {
      socket.removeAllListeners();
      socket.disconnect();
    }

    next(action);
  };
};

export default chatMiddleware;

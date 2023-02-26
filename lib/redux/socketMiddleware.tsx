import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";
import { ChatMessage, User } from "@/types/typings";
import { ChatEvents } from "../constants";
import { socketActions } from "./reducers/socketSlice";
import { parseOnlineUsers } from "../helpers";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const chatMiddleware: Middleware = (store) => {
  let socket: Socket;

  return (next) => (action) => {
    const isConnectionEstablished = socket;
    const user: User = store.getState().user.user;

    if (socketActions.startConnecting.match(action)) {
      if (!isConnectionEstablished) {
        socket = io(apiURL as string, { autoConnect: false });
      }

      socket.on("connect", () => {
        store.dispatch(socketActions.connectionEstablished());
        socket.emit(ChatEvents.RequestAllMessages);
      });

      socket.on(ChatEvents.SendAllMessages, (messages: ChatMessage[]) => {
        store.dispatch(socketActions.receiveAllMessages({ messages }));
      });

      socket.on(ChatEvents.ReceiveMessage, (message: ChatMessage) => {
        const uid =
          message.senderId === user.id ? message.receiverId : message.senderId;

        console.log("uid is", uid);

        store.dispatch(socketActions.receiveMessage({ message, uid }));
      });

      socket.on(ChatEvents.AllUsers, (users: []) => {
        console.log("onlien user", users);

        const newUsers = parseOnlineUsers(users, user.id);
        store.dispatch(socketActions.saveUsers(newUsers));
      });

      console.log("user is state", user.id);

      socket.auth = {
        userID: user.id,
        username: user.name,
        email: user.email,
        image: user.image,
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
    if (socketActions.disconnect.match(action) && isConnectionEstablished) {
      socket.removeAllListeners();
      socket.disconnect();
    }

    next(action);
  };
};

export default chatMiddleware;

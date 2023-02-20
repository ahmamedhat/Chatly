import { User } from "@/typings";
import { io, Socket } from "socket.io-client";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export function socketConnect(user: User) {
  const socket = io(apiURL as string, { autoConnect: false });

  socket?.on("connect", () => {
    console.log("you connected app with socket? id: ", socket?.id);
  });
  socket?.on("new user connected", (user) => {
    console.log("a new user has connected", user?.userID);
  });
  socket?.on("receive-message", (socket) => {
    console.log("app socket? message is", socket);
  });
  socket.on("connect_error", (err) => {
    if (err.message === "invalid username") {
      console.log("invalid username");
    }
  });
  socket.auth = {
    username: user.name,
    email: user.email,
    image: user.image,
  };
  socket.connect();

  return socket;
}

export function getConnectedUsers(
  socket: Socket,
  callback: (users: []) => void
) {
  socket?.on("users", (users: []) => {
    console.log("users connected are", users);
    users.forEach((user: any) => {
      user.self = user.userID === socket?.id;
      // initReactiveProperties(user);
    });
    // put the current user first, and then sort by username
    users = users.sort(
      (
        a: { self: boolean; username: string },
        b: { self: boolean; username: string }
      ) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      }
    );

    callback(users);
  });
}

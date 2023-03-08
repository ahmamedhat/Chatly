import { ChatsHistory, OnlineUsers } from "@/components";
import { GET_CHATS } from "@/lib/api/query";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import client from "@/lib/api/apollo";

// The erro causing the app to crash

// 2023-03-08T10:08:46.060Z	9c36f49c-45e3-41e5-b2c5-f348653cb456	ERROR	Unhandled Promise Rejection 	{"errorType":"Runtime.UnhandledPromiseRejection","errorMessage":"MongoServerSelectionError: connection timed out","reason":{"errorType":"MongoServerSelectionError","errorMessage":"connection timed out","reason":{"type":"ReplicaSetNoPrimary","servers":{},"stale":false,"compatible":true,"heartbeatFrequencyMS":10000,"localThresholdMS":15,"setName":"atlas-gh0grs-shard-0","maxElectionId":null,"maxSetVersion":null,"commonWireVersion":0,"logicalSessionTimeoutMinutes":null},"stack":["MongoServerSelectionError: connection timed out","    at Timeout._onTimeout (/var/task/node_modules/mongodb/lib/sdam/topology.js:277:38)","    at listOnTimeout (node:internal/timers:564:17)","    at process.processTimers (node:internal/timers:507:7)"]},"promise":{},"stack":["Runtime.UnhandledPromiseRejection: MongoServerSelectionError: connection timed out","    at process.<anonymous> (file:///var/runtime/index.mjs:1188:17)","    at process.emit (node:events:525:35)","    at emit (node:internal/process/promises:149:20)","    at processPromiseRejections (node:internal/process/promises:283:27)","    at process.processTicksAndRejections (node:internal/process/task_queues:96:32)"]}
// [ERROR] [1678270126061] LAMBDA_RUNTIME Failed to post handler success response. Http response code: 400.
// RequestId: e73f9f98-5b74-40b5-a40c-7eaa65ecffae Error: Runtime exited with error: exit status 128
// Runtime.ExitError

export const metadata = {
  title: "Messages",
  description: "All your old messages and online users are shown here",
};

export const dynamic = "force-dynamic";

export default async function Messages() {
  let session;
  let chats;

  try {
    session = await getServerSession(authOptions);
  } catch (e) {
    console.error("session error", e);
    throw new Error("error getting user session");
  }

  if (session?.user) {
    try {
      const response = await client.query({
        query: GET_CHATS,
        variables: { userId: session?.user?.id },
        fetchPolicy: "network-only",
      });
      chats = response.data.chats;
    } catch (e) {
      throw new Error("error getting chats");
    }
  }
  return (
    <div className="h-full">
      <ChatsHistory currentUser={session?.user} chats={chats} />
      <OnlineUsers currentUser={session?.user} />
    </div>
  );
}

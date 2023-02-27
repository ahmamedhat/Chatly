import { OnlineUsers } from "@/components";

export default function Messages() {
  // const [chats, setChats] = useState(Chats);

  return (
    <div className="h-full">
      {/* <div className="max-w-[50rem] mx-auto">
        <h2 className="font-semibold text-lg mb-4text-gray-600 dark:text-gray-400">
          Messages
        </h2>
        {chats.length > 0 ? (
          chats.map((chat) => {
            return (
              <PersonChat
                key={chat.id}
                name={chat.name}
                id={chat.id}
                message={chat.message}
                time={chat.time}
                image={chat.image}
                chatID={chat.chatID}
              />
            );
          })
        ) : (
          <EmptyMessages
            title="You Don't Have Any Chats Yet"
            descriptipon="Invite a friend or start chatting with a random person!"
          />
        )}
      </div>  */}
      <OnlineUsers />
    </div>
  );
}

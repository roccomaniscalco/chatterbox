import { Stack } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import pusherJs from "pusher-js";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import ChatLayout from "../../chatLayout/ChatLayout";
import Message from "../../components/Message";

const Chat = () => {
  const { scrollIntoView: scrollToLastMessage, targetRef: lastMessageRef } =
    useScrollIntoView({ duration: 500 });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const pusher = new pusherJs(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      channelAuthorization: {
        endpoint: "/api/pusher/auth",
      },
    });

    const channel = pusher.subscribe("private-chat");
    channel.bind("chat-event", (data) => {
      flushSync(() => {
        setMessages((prevState) => [...prevState, data]);
      });
      scrollToLastMessage({ alignment: "start" });
    });

    return () => {
      pusher.unsubscribe("private-chat");
    };
  }, [scrollToLastMessage]);

  return (
    <Stack spacing={0}>
      {messages.map((msg, i) => (
        <Message
          msg={msg}
          prevMsg={messages[i - 1]}
          ref={i === messages.length - 1 ? lastMessageRef : null}
          key={i}
        />
      ))}
    </Stack>
  );
};

Chat.getLayout = (page) => {
  return <ChatLayout>{page}</ChatLayout>;
};

export default Chat;

import { Stack } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import pusherJs from "pusher-js";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import ChatLayout from "../components/ChatLayout";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { authOptions } from "../config";

const Chat = () => {
  const { scrollIntoView: scrollToLastMessage, targetRef: lastMessageRef } =
    useScrollIntoView({ duration: 500 });
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const pusher = new pusherJs(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe("chat");
    channel.bind("chat-event", (data) => {
      flushSync(() => {
        setMessages((prevState) => [...prevState, data]);
      });
      scrollToLastMessage();
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, [scrollToLastMessage]);

  const sendMessage = async (content) => {
    await fetch("/api/pusher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        sender: session.user,
        sentAt: Date.now(),
      }),
    });
  };

  return (
    <>
      <Stack spacing={0} pb={60}>
        {messages.map((msg, i) => (
          <Message
            msg={msg}
            prevMsg={messages[i - 1]}
            ref={i === messages.length - 1 ? lastMessageRef : null}
            key={i}
          />
        ))}
      </Stack>

      <MessageInput sendMessage={sendMessage} />
    </>
  );
};

Chat.getLayout = (page) => {
  return <ChatLayout>{page}</ChatLayout>;
};

export const getServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return { redirect: { destination: "/", permanent: false } };
  return { props: { session } };
};

export default Chat;

import { Stack } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { io } from "socket.io-client";
import ChatLayout from "../components/ChatLayout";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { authOptions } from "../config";

let socket;

const Chat = () => {
  const { scrollIntoView: scrollToLastMessage, targetRef: lastMessageRef } =
    useScrollIntoView({ duration: 500 });
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const socketInitializer = useCallback(async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("message", (msg) => {
      flushSync(() => setMessages((prevMsgs) => [...prevMsgs, msg]));
      scrollToLastMessage();
    });
  }, [scrollToLastMessage]);

  useEffect(() => {
    socketInitializer();
  }, [socketInitializer]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    const trimmedInput = input.trim()
    if (trimmedInput.length < 1) return;
    socket.emit("message", {
      text: trimmedInput,
      user: session.user,
      sentAt: Date.now(),
    });
    setInput("");
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

      <MessageInput
        input={input}
        handleChange={handleChange}
        sendMessage={sendMessage}
      />
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

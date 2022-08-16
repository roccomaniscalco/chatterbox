import { Stack, Textarea, TextInput } from "@mantine/core";
import { getHotkeyHandler, useScrollIntoView } from "@mantine/hooks";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { io } from "socket.io-client";
import ChatLayout from "../components/ChatLayout";
import Message from "../components/Message";
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
    if (input.length < 1) return;
    socket.emit("message", {
      text: input,
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

      <Textarea
        value={input}
        onChange={handleChange}
        onKeyDown={getHotkeyHandler([["Enter", sendMessage]])}
        size="md"
        autosize
        minRows={2}
        placeholder="Send a message"
        aria-label="Message input"
        autoComplete="off"
        styles={(theme) => ({
          root: {
            position: "fixed",
            bottom: 16,
            width: "calc(100% - 112px)",
          },
          input: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
            borderColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[2],
            "&:focus": {
              backgroundColor:
                theme.colorScheme === "dark" ? theme.black : theme.white,
              borderColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[7]
                  : theme.colors.gray[2],
              boxShadow:
                theme.colorScheme === "dark" ? "none" : theme.shadows.xl,
            },
            // stop scroll bar flashing when a new row is types
            // must be used with autosize true and no maxRows
            overflow: "hidden",
          },
        })}
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

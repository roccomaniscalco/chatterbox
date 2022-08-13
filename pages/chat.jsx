import {
  Avatar,
  Box,
  Card,
  createStyles,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { getHotkeyHandler, useHotkeys } from "@mantine/hooks";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { authOptions } from "../config";
import ChatLayout from "../layouts/chat/ChatLayout";

let socket;

const useStyles = createStyles((theme, _params, getRef) => ({
  messageWrapper: {
    alignItems: "start",
    display: "flex",
    gap: theme.spacing.xs,
  },
  myMessageWrapper: {
    flexDirection: "row-reverse",
    justifyContent: "end",

    "> *": {
      alignItems: "end",
    },

    ["." + getRef("messageBubble")]: {
      backgroundColor:
        theme.colors[theme.primaryColor][theme.fn.primaryShade()],
      color: theme.white,
      borderRadius: "25px 0px 25px 25px",
    },
  },
  messageBubble: {
    ref: getRef("messageBubble"),
    minWidth: "min-content",
    maxWidth: "max-content",
    width: "100%",
    borderRadius: "0px 25px 25px 25px",
    paddingBlock: theme.spacing.md,
    paddingInline: theme.spacing.lg,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[2],
  },
}));

const Chat = () => {
  const { classes, cx } = useStyles();
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("message", (msg) => {
      setMessages((prevMsgs) => [...prevMsgs, msg]);
    });
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (input.length < 1) return;
    socket.emit("message", { text: input, user: session.user });
    setInput("");
  };

  return (
    <>
      <Stack spacing="xl">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cx(
              classes.messageWrapper,
              session.user.email === msg.user.email && classes.myMessageWrapper
            )}
          >
            <Avatar size="md" radius="xl" src={msg.user.image} />
            <Stack spacing={6}>
              <Text size="xs">{msg.user.name}</Text>
              <div className={cx(classes.messageBubble)}>
                <Text>{msg.text}</Text>
              </div>
            </Stack>
          </div>
        ))}
      </Stack>

      <TextInput
        value={input}
        onChange={handleChange}
        onKeyDown={getHotkeyHandler([["Enter", sendMessage]])}
        size="md"
        placeholder="Send a message"
        sx={{ position: "fixed", bottom: 16, width: "calc(100% - 112px)" }}
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

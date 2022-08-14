import { Avatar, createStyles, Stack, Text, TextInput } from "@mantine/core";
import { getHotkeyHandler, useScrollIntoView } from "@mantine/hooks";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { io } from "socket.io-client";
import ChatLayout from "../components/ChatLayout";
import { authOptions } from "../config";

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
    ["." + getRef("messageBubble")]: {
      backgroundColor:
        theme.colors[theme.primaryColor][theme.fn.primaryShade()],
      color: theme.white,
      borderRadius: "20px 0px 20px 20px",
    },
    "& > div": {
      alignItems: "end",
    },
  },
  messageBubble: {
    ref: getRef("messageBubble"),
    minWidth: "min-content",
    maxWidth: "max-content",
    width: "100%",
    overflowWrap: "anywhere",
    borderRadius: "0px 25px 25px 25px",
    paddingBlock: theme.spacing.sm,
    paddingInline: theme.spacing.md,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[2],
  },
}));

const Chat = () => {
  const { classes, cx } = useStyles();
  const { scrollIntoView: scrollToLastMessage, targetRef: lastMessageRef } =
    useScrollIntoView({ duration: 600 });
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
    console.count("useEffect ran");
    socketInitializer();
  }, [socketInitializer]);

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
      <Stack spacing="xl" pb={70}>
        {messages.map((msg, i) => (
          <div
            ref={i === messages.length - 1 ? lastMessageRef : null}
            className={cx(
              classes.messageWrapper,
              session.user.email === msg.user.email && classes.myMessageWrapper
            )}
            key={i}
          >
            <Avatar size="md" radius="xl" src={msg.user.image} />
            <Stack spacing={6} sx={{ flex: 1 }}>
              <Text size="xs">{msg.user.name}</Text>
              <div className={cx(classes.messageBubble)}>
                <Text sx={{}}>{msg.text}</Text>
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

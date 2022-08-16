import {
  Avatar,
  createStyles,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { getHotkeyHandler, useScrollIntoView } from "@mantine/hooks";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { io } from "socket.io-client";
import ChatLayout from "../components/ChatLayout";
import { authOptions } from "../config";

const shortTime = Intl.DateTimeFormat("en", {
  timeStyle: "short",
});
let socket;

const useStyles = createStyles((theme, _params, getRef) => ({
  messageWrapper: {
    alignItems: "start",
    display: "flex",
    gap: theme.spacing.xs,
    paddingBottom: 4,
    "&:hover > div": {
      opacity: 1,
    },
  },

  userMessageWrapper: {
    flexDirection: "row-reverse",
    justifyContent: "end",
    ["." + getRef("messageBubble")]: {
      backgroundColor:
        theme.colors[theme.primaryColor][theme.fn.primaryShade()],
      color: theme.white,
      borderTopLeftRadius: theme.radius.xl,
      borderTopRightRadius: 0,
    },
    "& > div": {
      alignItems: "end",
      textAlign: "left",
      div: {
        flexDirection: "row-reverse",
      },
    },
  },

  messageBubble: {
    ref: getRef("messageBubble"),
    minWidth: "min-content",
    maxWidth: "max-content",
    width: "100%",
    flex: 1,
    overflowWrap: "anywhere",
    borderRadius: theme.radius.xl,
    borderTopLeftRadius: 0,
    paddingBlock: theme.spacing.xs,
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

  const isUserMessage = (msg) => msg?.user.email === session.user.email;

  return (
    <>
      <Stack spacing={0} pb={70}>
        {messages.map((msg, i) => (
          <div
            ref={i === messages.length - 1 ? lastMessageRef : null}
            className={cx(
              classes.messageWrapper,
              isUserMessage(msg) && classes.userMessageWrapper
            )}
            key={i}
          >
            {isUserMessage(messages[i - 1]) ? (
              <>
                <Text size="xs" align="right" sx={{ width: 38, opacity: 0 }}>
                  {shortTime.format(msg.sentAt).substring(0, 5)}
                </Text>
                <div className={classes.messageBubble}>
                  <Text>{msg.text}</Text>
                </div>
              </>
            ) : (
              <>
                <Avatar size="md" radius="xl" src={msg.user.image} />
                <Stack spacing={6} sx={{ flex: 1 }}>
                  <Group spacing="sm" align="baseline">
                    <Text size="sm" weight="bold">
                      {msg.user.name}
                    </Text>
                    <Text size="xs">{shortTime.format(msg.sentAt)}</Text>
                  </Group>
                  <div className={classes.messageBubble}>
                    <Text>{msg.text}</Text>
                  </div>
                </Stack>
              </>
            )}
          </div>
        ))}
      </Stack>

      <TextInput
        value={input}
        onChange={handleChange}
        onKeyDown={getHotkeyHandler([["Enter", sendMessage]])}
        size="md"
        placeholder="Send a message"
        aria-label="Message input"
        autocomplete="off"
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

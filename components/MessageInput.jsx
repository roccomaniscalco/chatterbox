import { ActionIcon, createStyles, Kbd, Textarea } from "@mantine/core";
import { getHotkeyHandler, useHotkeys, useOs } from "@mantine/hooks";
import { IconSend } from "@tabler/icons";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

const useStyles = createStyles((theme) => ({
  root: {
    width: "100%",
  },
  input: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[1],
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[2],
    "&::placeholder": {
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[5],
    },
    // stop scroll bar flashing when a new row is typed
    // must be used with autosize true and no maxRows
    overflow: "hidden",
  },
  submitButton: {
    backgroundColor: theme.fn.primaryColor(),
    color: theme.white,
    "&:hover": {
      backgroundColor: theme.fn.primaryColor(),
      color: theme.white,
    },
    ":disabled": {
      backgroundColor: "transparent",
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[5],
    },
  },
  kbd: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
    border: `${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    } 1px solid`,
  },
}));

const MessageInput = () => {
  const { data: session } = useSession();
  const { classes } = useStyles();
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textAreaRef = useRef();
  useHotkeys([["mod+J", () => textAreaRef.current.focus()]]);

  // useOs will result in hydration mismatch if used on server
  const os = useOs();

  const switchOs = () => {
    if (os === "macos") return { kbd: "⌘ + J", kbdWidth: 68 };
    if (os === "windows") return { kbd: "Ctrl + J", kbdWidth: 89 };
    if (os === "linux") return { kbd: "Ctrl + J", kbdWidth: 89 };
    return undefined;
  };

  // TODO: replace with mutation
  const sendMessage = async (content) => {
    await fetch("/api/create-message", {
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

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    sendMessage(value);
    setValue("");
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <Textarea
      rightSection={
        isFocused ? (
          <ActionIcon
            onClick={handleSubmit}
            disabled={value.length < 1}
            className={classes.submitButton}
          >
            <IconSend size={16} />
          </ActionIcon>
        ) : (
          <Kbd className={classes.kbd}>{switchOs()?.kbd}</Kbd>
        )
      }
      rightSectionWidth={isFocused ? 47 : switchOs()?.kbdWidth}
      value={value}
      ref={textAreaRef}
      onChange={handleChange}
      onKeyDown={getHotkeyHandler([["Enter", handleSubmit]])}
      onFocus={handleFocus}
      onBlur={handleBlur}
      size="md"
      variant="filled"
      autosize
      minRows={1}
      placeholder="Send a message"
      aria-label="Message input"
      autoComplete="off"
      classNames={{ root: classes.root, input: classes.input }}
    />
  );
};

export default MessageInput;

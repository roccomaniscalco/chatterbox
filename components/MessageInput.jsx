import { ActionIcon, createStyles, Textarea, Tooltip } from "@mantine/core";
import { getHotkeyHandler, useWindowEvent } from "@mantine/hooks";
import { IconSend } from "@tabler/icons";
import { func } from "prop-types";
import { useRef, useState } from "react";

const useStyles = createStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: 16,
    width: "calc(100% - 112px)",
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
    "&:focus, &:focus-within": {
      borderColor:
        theme.colorScheme === "dark"
          ? `${theme.colors.dark[5]} !important`
          : `${theme.colors.gray[5]} !important`,
    },
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
}));

const MessageInput = ({ sendMessage }) => {
  const { classes } = useStyles();
  const [value, setValue] = useState("");
  const textAreaRef = useRef();
  useWindowEvent("keypress", (e) => {
    if (e.key === "Enter") return;
    textAreaRef.current.focus();
  });

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    sendMessage(value);
    setValue("");
  };

  return (
    <Textarea
      rightSection={
        <ActionIcon
          onClick={handleSubmit}
          variant="subtle"
          disabled={value.length < 1}
          className={classes.submitButton}
        >
          <IconSend size={16} />
        </ActionIcon>
      }
      rightSectionWidth={47}
      rightSectionProps={{ style: { height: 47 } }}
      value={value}
      onChange={handleChange}
      onKeyDown={getHotkeyHandler([["Enter", handleSubmit]])}
      size="md"
      variant="filled"
      autosize
      minRows={1}
      placeholder="Send a message"
      aria-label="Message input"
      autoComplete="off"
      classNames={{ root: classes.root, input: classes.input }}
      ref={textAreaRef}
    />
  );
};

MessageInput.propTypes = {
  sendMessage: func.isRequired,
};

export default MessageInput;

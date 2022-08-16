import { createStyles, Textarea } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { func, string } from "prop-types";

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
    "&:focus": {
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[5],
    },
    "&::placeholder": {
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[5],
    },
    // stop scroll bar flashing when a new row is types
    // must be used with autosize true and no maxRows
    overflow: "hidden",
  },
}));

const MessageInput = ({ input, handleChange, sendMessage }) => {
  const { classes } = useStyles();
  return (
    <Textarea
      value={input}
      onChange={handleChange}
      onKeyDown={getHotkeyHandler([["Enter", sendMessage]])}
      size="md"
      autosize
      minRows={1}
      placeholder="Send a message"
      aria-label="Message input"
      autoComplete="off"
      classNames={classes}
    />
  );
};

MessageInput.propTypes = {
  input: string.isRequired,
  handleChange: func.isRequired,
  sendMessage: func.isRequired,
};

export default MessageInput;

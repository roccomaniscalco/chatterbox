import { Avatar, createStyles, Group, Stack, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import { number, shape, string } from "prop-types";
import { forwardRef, memo } from "react";

const useStyles = createStyles((theme, _params, getRef) => ({
  messageWrapper: {
    alignItems: "start",
    display: "flex",
    gap: theme.spacing.xs,
    paddingBottom: 4,
    [`&:hover .${getRef("startAt")}`]: {
      opacity: 1,
    },
  },

  userMessageWrapper: {
    flexDirection: "row-reverse",
    justifyContent: "end",
    ["." + getRef("messageBubble")]: {
      backgroundColor: theme.fn.primaryColor(),
      color: theme.white,
      borderTopLeftRadius: theme.radius.xl,
      borderTopRightRadius: 0,
    },
    [`.${getRef("startAt")}`]: {
      textAlign: "left",
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

  startAt: {
    ref: getRef("startAt"),
    textAlign: "right",
    width: 38,
    opacity: 0,
  },
}));

const shortTime = Intl.DateTimeFormat("en", {
  timeStyle: "short",
});

const Message = forwardRef(({ msg, prevMsg }, ref) => {
  const { classes, cx } = useStyles();
  const { data: session } = useSession();

  const isUserMessage = (msg) => msg?.user.email === session.user.email;

  return (
    <div
      className={cx(
        classes.messageWrapper,
        isUserMessage(msg) && classes.userMessageWrapper
      )}
      ref={ref}
    >
      {isUserMessage(prevMsg) ? (
        <>
          <Text size="xs" align="right" className={classes.startAt}>
            {shortTime.format(msg.sentAt).substring(0, 5)}
          </Text>
          <div className={classes.messageBubble}>
            <Text>{msg.text}</Text>
          </div>
        </>
      ) : (
        <>
          <Avatar size="md" radius="xl" src={msg.user.image} />
          <Stack spacing={6}>
            <Group
              spacing="xs"
              align="baseline"
              sx={{
                flexDirection: isUserMessage(msg) ? "row-reverse" : "start",
              }}
            >
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
  );
});

const message = shape({
  user: shape({
    name: string.isRequired,
    email: string.isRequired,
    image: string.isRequired,
  }),
  text: string.isRequired,
  sentAt: number.isRequired,
});

Message.propTypes = {
  msg: message.isRequired,
  prevMsg: message,
};

Message.displayName = "Message";

export default Message;
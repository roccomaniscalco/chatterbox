import { Avatar, createStyles, Group, Stack, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import { number, shape, string } from "prop-types";
import { forwardRef } from "react";

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
    // contains user name and sentAt
    ".firstUserMessageGroup": {
      flexDirection: "row-reverse",
    },
    // contains firstUserMessageGroup and messageBubble
    ".firstUserMessageStack": {
      alignItems: "end",
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

  const isUserMsg = msg?.sender.email === session.user.email;
  const isSameUser = msg?.sender.email === prevMsg?.sender.email;

  return (
    <div
      className={cx(
        classes.messageWrapper,
        isUserMsg && classes.userMessageWrapper
      )}
      ref={ref}
    >
      {isSameUser ? (
        <>
          <Text size="xs" align="right" className={classes.startAt}>
            {shortTime.format(msg.sentAt).substring(0, 5)}
          </Text>
          <div className={classes.messageBubble}>
            <Text>{msg.content}</Text>
          </div>
        </>
      ) : (
        <>
          <Avatar size="md" radius="xl" src={msg.sender.image} />
          <Stack spacing={6} className="firstUserMessageStack">
            <Group
              spacing="xs"
              align="baseline"
              className="firstUserMessageGroup"
            >
              <Text size="sm" weight="bold">
                {msg.sender.name}
              </Text>
              <Text size="xs">{shortTime.format(msg.sentAt)}</Text>
            </Group>
            <div className={classes.messageBubble}>
              <Text>{msg.content}</Text>
            </div>
          </Stack>
        </>
      )}
    </div>
  );
});

const message = shape({
  sender: shape({
    name: string.isRequired,
    email: string.isRequired,
    image: string.isRequired,
  }),
  content: string.isRequired,
  sentAt: number.isRequired,
});

Message.propTypes = {
  msg: message.isRequired,
  prevMsg: message,
};

Message.displayName = "Message";

export default Message;

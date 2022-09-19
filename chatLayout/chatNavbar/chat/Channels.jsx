import { Avatar, createStyles, NavLink, Skeleton, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import api from "../../../lib/api";

const useStyles = createStyles((theme) => ({
  root: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[1],
    },
    "&[data-active=true]": {
      borderRight: `2px solid ${theme.fn.primaryColor()}`,
    },
  },
  label: {
    textOverflow: "ellipsis",
  },
}));

const Channels = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const { data: channels, isLoading } = useQuery(
    ["channels"],
    api.getChannelsByUser,
    { staleTime: Infinity } // never refetch channels automatically
  );

  if (isLoading)
    return (
      <Stack p="md">
        <Skeleton width="100%" height="40px" />
        <Skeleton width="100%" height="40px" />
        <Skeleton width="100%" height="40px" />
        <Skeleton width="100%" height="40px" />
      </Stack>
    );

  const sortedChannels = Object.values(channels).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div style={{ height: "100%" }}>
      {Object.values(sortedChannels).map((channel) => (
        // TODO: force user to create unique slug in NewChannelForm
        <Link href={`/chat/${channel.name}`} passHref key={channel.id}>
          <NavLink
            active={router.asPath === `/chat/${channel.name}`}
            classNames={{ root: classes.root, label: classes.label }}
            icon={<Avatar src={channel.image}>{channel.name[0]}</Avatar>}
            label={channel.name}
            description={`${channel._count.users} ${
              channel._count.users === 1 ? "member" : "members"
            }`}
            px="md"
            component="a"
          />
        </Link>
      ))}
    </div>
  );
};

export default Channels;

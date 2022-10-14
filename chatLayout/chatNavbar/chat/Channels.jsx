import { Avatar, createStyles, NavLink, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import StackSkeleton from "../../../components/StackSkeleton";
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
    {
      staleTime: Infinity, // never refetch channels automatically
      select: (channels) =>
        channels.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    }
  );

  if (isLoading) return <StackSkeleton />;

  return (
    <Stack spacing={0} pb="xl">
      {channels.map((channel) => (
        <Link href={`/chat/${channel.slug}`} passHref key={channel.id}>
          <NavLink
            active={router.asPath === `/chat/${channel.slug}`}
            classNames={{ root: classes.root, label: classes.label }}
            icon={
              <Avatar src={channel.image} alt={channel.name}>
                {channel.name[0]}
              </Avatar>
            }
            label={channel.name}
            description={`${channel._count.users} ${
              channel._count.users === 1 ? "chatter" : "chatters"
            }`}
            px="md"
            component="a"
          />
        </Link>
      ))}
    </Stack>
  );
};

export default Channels;

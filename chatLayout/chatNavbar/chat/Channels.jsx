import { Avatar, NavLink, Skeleton, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import api from "../../../lib/api";

const Channels = () => {
  const router = useRouter();
  const { data: channels, isLoading } = useQuery(
    ["channels"],
    api.getChannelsByUser,
    { staleTime: Infinity } // never refetch channels automatically
  );

  const channelListLoadingSkeleton = (
    <Stack p="md">
      <Skeleton width="100%" height="40px" />
      <Skeleton width="100%" height="40px" />
      <Skeleton width="100%" height="40px" />
      <Skeleton width="100%" height="40px" />
    </Stack>
  );
  
  if (isLoading) return channelListLoadingSkeleton;
  
  const sortedChannels = Object.values(channels).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div style={{ height: "100%" }}>
      {Object.values(sortedChannels).map((channel) => (
        // TODO: force user to create unique slug in NewChannelForm
        <Link href={`/chat/${channel.name}`} passHref key={channel.id}>
          <NavLink
            styles={{
              root: {
                whiteSpace: "nowrap",
                overflow: "hidden",
              },
              label: {
                textOverflow: "ellipsis",
              },
            }}
            active={router.asPath === `/chat/${channel.name}`}
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

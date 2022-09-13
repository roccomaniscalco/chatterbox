import { Avatar, NavLink } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import api from "../../../lib/api";

const Channels = () => {
  const router = useRouter();
  const { data: userChannels, isLoading } = useQuery(
    ["channels"],
    api.getChannelsByUser,
    { staleTime: Infinity } // Never refetch
  );

  if (isLoading) return "loading...";

  return (
    <div style={{ height: "100%" }}>
      {Object.values(userChannels).map((channel) => (
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
            description={`${channel._count.users} chatters`}
            px="md"
            component="a"
          />
        </Link>
      ))}
    </div>
  );
};

export default Channels;

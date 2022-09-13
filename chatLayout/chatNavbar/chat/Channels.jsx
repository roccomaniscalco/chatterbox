import { Avatar, Group, NavLink, Paper, Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

const channelsData = [
  {
    id: 0,
    adminId: 123,
    name: "The Homies",
    slug: "homies",
    description: "A safe place for homies to kiss each other goodnight",
    image: "https://c.tenor.com/JEnYk1aBg2EAAAAC/gay-kiss.gif",
    createdAt: 1662598392693,
    users: [],
  },
  {
    id: 1,
    adminId: 123,
    name: "The Super Broskis kfrkflr;vkv;l4tkvdkfr;kf;rkfkr4",
    slug: "broskis",
    createdAt: 1662598392693,
    users: [],
  },
];

const Channels = () => {
  const router = useRouter();

  const channels = channelsData.map((channel) => (
    // TODO: force user to create unique slug in NewChannelForm
    <Link href={`/chat/${channel.slug}`} passHref key={channel.id}>
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
        active={router.asPath === `/chat/${channel.slug}`}
        icon={<Avatar src={channel.image}>{channel.name[0]}</Avatar>}
        label={channel.name}
        description={`${channel.users.length} chatters`}
        px="md"
        component="a"
      />
    </Link>
  ));

  return <div>{channels}</div>;
};

export default Channels;

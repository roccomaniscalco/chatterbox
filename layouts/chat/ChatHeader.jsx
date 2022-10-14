import { Avatar, Box, Group, Skeleton, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import api from "../../lib/api";
import { HEADER_HEIGHT } from "../../lib/constants";

// only to be used in /pages/chat/[channelSlug]
const ChatHeader = () => {
  const router = useRouter();
  const { channelSlug } = router.query;

  const { data: channelInfo } = useQuery(["channels"], api.getChannelsByUser, {
    staleTime: Infinity,
    select: (channels) =>
      channels.find((channel) => channel.slug === channelSlug),
  });

  const { data: channelUsers, isLoading: isLoadingChannelUsers } = useQuery(
    ["channel", channelSlug],
    () => api.getChannel(channelSlug),
    {
      staleTime: Infinity,
      select: (channel) => channel.users,
    }
  );

  return (
    <Box
      p="md"
      sx={(theme) => ({
        height: HEADER_HEIGHT,
        width: "100%",
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.fn.rgba(theme.colors.dark[9], 0.7)
            : theme.fn.rgba(theme.white, 0.7),
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[2]
        }`,
        backdropFilter: "blur(40px)",
      })}
    >
      <Group sx={{ height: "100%" }} position="apart" noWrap>
        {!channelInfo ? (
          <Skeleton width={180} height={34} />
        ) : (
          <Group spacing="xs" noWrap>
            <Avatar src={channelInfo.image}>{channelInfo.name[0]}</Avatar>
            <Title order={4} lineClamp={1} sx={{ lineBreak: "anywhere" }}>
              {channelInfo.name}
            </Title>
          </Group>
        )}
        {isLoadingChannelUsers ? (
          <Group spacing={0} noWrap>
            <Skeleton
              height={34}
              circle
              sx={{ transform: "translate(20px)" }}
            />
            <Skeleton
              height={34}
              circle
              sx={{ transform: "translate(10px)" }}
            />
            <Skeleton height={34} circle />
          </Group>
        ) : (
          <Avatar.Group>
            {channelUsers.map((user) => (
              <Avatar src={user.image} radius="xl" key={user.id}>
                {user.name[0]}
              </Avatar>
            ))}
          </Avatar.Group>
        )}
      </Group>
    </Box>
  );
};

export default ChatHeader;

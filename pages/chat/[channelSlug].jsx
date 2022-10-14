import { Avatar, Group, Skeleton, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import ChatHeader from "../../layouts/dashboard/DashboardHeader";
import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import api from "../../lib/api";
import { HEADER_HEIGHT } from "../../lib/constants";

const SpecificChat = () => {
  const router = useRouter();
  const { channelSlug } = router.query;

  const { data: channelInfo, isLoading: isLoadingChannelInfo } = useQuery(
    ["channels"],
    api.getChannelsByUser,
    {
      staleTime: Infinity,
      select: (channels) =>
        channels.find((channel) => channel.slug === channelSlug),
    }
  );

  const { data: channelUsers, isLoading: isLoadingChannelUsers } = useQuery(
    ["channel", channelSlug],
    () => api.getChannel(channelSlug),
    {
      staleTime: Infinity,
      select: (channel) => channel.users,
    }
  );

  return (
    <>
      <ChatHeader height={HEADER_HEIGHT}>
        <Group sx={{ height: "100%" }} position="apart" noWrap>
          {isLoadingChannelInfo ? (
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
      </ChatHeader>
      <Text pl="md">Chat in {channelSlug}</Text>
    </>
  );
};

SpecificChat.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default SpecificChat;

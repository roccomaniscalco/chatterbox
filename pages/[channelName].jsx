import { Avatar, Group, Skeleton, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import ChatHeader from "../chatLayout/ChatHeader";
import ChatLayout from "../chatLayout/ChatLayout";
import api from "../lib/api";
import { HEADER_HEIGHT } from "../lib/constants";

const SpecificChat = () => {
  const router = useRouter();
  const { channelName } = router.query;
  const { data: channel, isLoading } = useQuery(["channel", channelName], () =>
    api.getChannel(channelName)
  );

  return (
    <>
      <ChatHeader height={HEADER_HEIGHT}>
        <Group sx={{ height: "100%" }} position="apart" noWrap>
          {isLoading ? (
            <Skeleton width={180} height={34} />
          ) : (
            <Group spacing="xs" noWrap>
              <Avatar src={channel.image}>{channel.name[0]}</Avatar>
              <Title order={4} lineClamp={1} sx={{ lineBreak: "anywhere" }}>
                {channel.name}
              </Title>
            </Group>
          )}
          {isLoading ? (
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
              {channel.users.map((user) => (
                <Avatar src={user.image} radius="xl" key={user.id}>
                  {user.name[0]}
                </Avatar>
              ))}
            </Avatar.Group>
          )}
        </Group>
      </ChatHeader>
      <Text pl="md">Chat in {channelName}</Text>
    </>
  );
};

SpecificChat.getLayout = (page) => {
  return <ChatLayout>{page}</ChatLayout>;
};

export default SpecificChat;

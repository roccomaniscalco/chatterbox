import { Avatar, Group, Skeleton, Text, Title, Tooltip } from "@mantine/core";
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
        <Group sx={{ height: "100%" }} position="apart" noWrap  >
          {isLoading ? (
            <Skeleton width={180} height={30} />
          ) : (
            <Title order={4} lineClamp={1}>{channel?.name}</Title>
          )}
          {isLoading ? (
            <Group spacing={0}>
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
                <Tooltip label={user.name} key={user.id}>
                  <Avatar
                    src={user.image}
                    radius="xl"
                    sx={{
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                        zIndex: 1,  
                      },
                    }}
                  >
                    {user.name[0]}
                  </Avatar>
                </Tooltip>
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

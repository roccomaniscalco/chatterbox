import { Avatar, NavLink, Skeleton, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import api from "../../../lib/api";

const Friendships = () => {
  const { data: session } = useSession();
  const { data: friendships, isLoading } = useQuery(
    ["friendships"],
    api.getFriendships,
    {
      select: (friendships) =>
        friendships.map((friendship) => ({
          userPairId: friendship.userPairId,
          friendsSince: friendship.updatedAt,
          friend:
            friendship.senderId === session.user.id
              ? friendship.receiver
              : friendship.sender,
        })),
    }
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

  return (
    <Stack sx={{ width: "100%" }}>
      {friendships?.map((friendship) => (
        <NavLink
          key={friendship.userPairId}
          icon={<Avatar src={friendship.friend.image} radius="xl" />}
          label={friendship.friend.name}
          description={friendship.friend.email}
          px="md"
        />
      ))}
    </Stack>
  );
};

export default Friendships;

import { Avatar, NavLink, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import StackSkeleton from "../../../components/StackSkeleton";
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

  if (isLoading) return <StackSkeleton />;

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

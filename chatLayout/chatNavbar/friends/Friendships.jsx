import { Skeleton, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import api from "../../../lib/api";

const Friendships = () => {
  const { data, isLoading, error } = useQuery(["friendships"], api.getFriendships);

  if (isLoading)
    return (
      <Stack p="md">
        <Skeleton width="100%" height="40px" />
        <Skeleton width="100%" height="40px" />
        <Skeleton width="100%" height="40px" />
        <Skeleton width="100%" height="40px" />
      </Stack>
    );

  return <div>{data && JSON.stringify(data)}</div>;
};

export default Friendships;

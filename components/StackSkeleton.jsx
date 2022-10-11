import { Skeleton, Stack } from "@mantine/core";
import React from "react";

const StackSkeleton = () => {
  return (
    <Stack p="md">
      <Skeleton width="100%" height="40px" />
      <Skeleton width="100%" height="40px" />
      <Skeleton width="100%" height="40px" />
      <Skeleton width="100%" height="40px" />
    </Stack>
  );
};

export default StackSkeleton;

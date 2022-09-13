import { Text } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import ChatLayout from "../../chatLayout/ChatLayout";

const SpecificChat = () => {
  const router = useRouter();
  const { channelName } = router.query;
  return <Text pl="md">Chat in {channelName}</Text>;
};

SpecificChat.getLayout = (page) => {
  return <ChatLayout>{page}</ChatLayout>;
};

export default SpecificChat;

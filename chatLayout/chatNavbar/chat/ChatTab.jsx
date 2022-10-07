import { Stack, Text } from "@mantine/core";
import TabHeader from "../TabHeader";
import Channels from "./Channels";
import NewChannelModal from "./NewChannelForm";

const ChatTab = () => {
  return (
    <>
      <TabHeader title="Chat" actionItem={<NewChannelModal />} />
      <Stack>
        <Stack spacing={0}>
          <Text size="sm" color="dimmed" pb={6} px="md">
            Channels
          </Text>
          <Channels />
        </Stack>
      </Stack>
    </>
  );
};

export default ChatTab;

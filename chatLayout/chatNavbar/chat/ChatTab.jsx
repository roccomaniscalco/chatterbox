import { Stack, Text } from "@mantine/core";
import { IconMessagePlus } from "@tabler/icons";
import AppModal from "../../../components/AppModal";
import TabHeader from "../TabHeader";
import Channels from "./Channels";
import NewChannelForm from "./NewChannelForm";

const ChatTab = () => {
  return (
    <>
      <TabHeader
        title="Chat"
        actionItem={
          <AppModal Icon={IconMessagePlus} title="New Channel">
            <NewChannelForm />
          </AppModal>
        }
      />
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

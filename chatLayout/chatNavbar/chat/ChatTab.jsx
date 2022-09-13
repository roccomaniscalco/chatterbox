import { Stack, Text, Tooltip } from "@mantine/core";
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
          // <Tooltip
          //   label="Create Channel"
          //   withArrow
          //   position="right"
          //   openDelay={1000}
          // >
            <AppModal Icon={IconMessagePlus} title="New Channel">
              <NewChannelForm />
            </AppModal>
          // </Tooltip>
        }
      />
      <Stack >
        <div>
          <Text size="sm" color="dimmed" pb={6} px="md">
            Channels
          </Text>
          <Channels />
        </div>
      </Stack>
    </>
  );
};

export default ChatTab;

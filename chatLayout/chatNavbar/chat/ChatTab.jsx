import { Stack, Text } from "@mantine/core";
import TabHeader from "../TabHeader";
import Channels from "./Channels";
import NewChannelModal from "./NewChannelForm";

const ChatTab = () => {
  return (
    <>
      <TabHeader title="Chat" actionItem={<NewChannelModal />} />
      <Channels />
    </>
  );
};

export default ChatTab;

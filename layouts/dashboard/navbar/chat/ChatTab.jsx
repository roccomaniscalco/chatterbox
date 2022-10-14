import TabHeader from "../TabHeader";
import Channels from "./Channels";
import NewChannelModal from "./NewChannelModal";

const ChatTab = () => {
  return (
    <>
      <TabHeader title="Chat" actionItem={<NewChannelModal />} />
      <Channels />
    </>
  );
};

export default ChatTab;

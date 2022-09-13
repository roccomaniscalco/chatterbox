import { Tooltip } from "@mantine/core";
import { IconMessagePlus } from "@tabler/icons";
import AppModal from "../../../components/AppModal";
import TabHeader from "../TabHeader";
import NewChannelForm from "./NewChannelForm";

const channels = [
  {
    id: 0,
    adminId: 123,
    name: "The homies",
    description: "A safe place for homies to kiss each other goodnight",
    image: "https://c.tenor.com/JEnYk1aBg2EAAAAC/gay-kiss.gif",
    createdAt: 1662598392693,
    users: [],
  },
];

const ChatTab = () => {
  return (
    <>
      <TabHeader
        title="Chat"
        actionItem={
          <Tooltip
            label="Create Channel"
            withArrow
            position="right"
            openDelay={1000}
          >
            <AppModal Icon={IconMessagePlus} title="New Channel">
              <NewChannelForm />
            </AppModal>
          </Tooltip>
        }
      />
    </>
  );
};

export default ChatTab;

import { ActionIcon, Tooltip } from "@mantine/core";
import { IconMessagePlus } from "@tabler/icons";
import TabHeader from "./TabHeader";

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

const MessagesTab = () => {
  return (
    <>
      <TabHeader
        title="Messages"
        actionItem={
          <Tooltip label="Create Channel" withArrow position="right" openDelay={1000}>
            <ActionIcon
              size="lg"
              sx={(theme) => ({ color: theme.fn.primaryColor() })}
            >
              <IconMessagePlus />
            </ActionIcon>
          </Tooltip>
        }
      />
    </>
  );
};

export default MessagesTab;

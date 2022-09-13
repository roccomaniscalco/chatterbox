import { Title } from "@mantine/core";
import TabTitle from "./TabTitle";

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
      <TabTitle >
        Messages
      </TabTitle>
    </>
  );
};

export default MessagesTab;

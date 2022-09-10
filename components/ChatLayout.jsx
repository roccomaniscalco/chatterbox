import { AppShell, Footer, Header } from "@mantine/core";
import { useSession } from "next-auth/react";
import ChatNavbar from "./ChatNavBar";
import MessageInput from "./MessageInput";

const HEADER_HEIGHT = 70;
const NAVBAR_WIDTH = 320;
const FOOTER_HEIGHT = 63;

const ChatLayout = ({ children }) => {
  const { data: session } = useSession();

  const chatHeader = (
    <Header
      height={HEADER_HEIGHT}
      fixed
      position={{ left: NAVBAR_WIDTH, right: 0 }}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.fn.rgba(theme.colors.dark[9], 0.7)
            : theme.fn.rgba(theme.white, 0.7),
        borderColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[2],
        backdropFilter: "blur(40px)",
      })}
    ></Header>
  );

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

  const chatFooter = (
    <Footer
      height={FOOTER_HEIGHT}
      px="md"
      sx={(theme) => ({
        borderTop: "none",
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
        left: NAVBAR_WIDTH,
      })}
    >
      <MessageInput />
    </Footer>
  );

  return (
    <AppShell
      fixed
      padding={0}
      header={chatHeader}
      navbar={
        <ChatNavbar navbarWidth={NAVBAR_WIDTH} headerHeight={HEADER_HEIGHT} />
      }
      footer={chatFooter}
    >
      {session && children}
    </AppShell>
  );
};

export default ChatLayout;

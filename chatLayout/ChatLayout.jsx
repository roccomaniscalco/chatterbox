import { AppShell, Footer, Header } from "@mantine/core";
import MessageInput from "../components/MessageInput";
import ChatNavbar from "./chatNavbar/ChatNavbar";

// sizes in pixels (px)
const HEADER_HEIGHT = 70;
const NAVBAR_ASIDE_WIDTH = 64;
const NAVBAR_WIDTH = 320;
const FOOTER_HEIGHT = 63;

const ChatLayout = ({ children }) => {
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
        <ChatNavbar
          navbarWidth={NAVBAR_WIDTH}
          navbarAsideWidth={NAVBAR_ASIDE_WIDTH}
          headerHeight={HEADER_HEIGHT}
        />
      }
      footer={chatFooter}
    >
      {children}
    </AppShell>
  );
};

export default ChatLayout;

import { AppShell, Footer } from "@mantine/core";
import MessageInput from "../components/MessageInput";
import {
  FOOTER_HEIGHT,
  HEADER_HEIGHT,
  NAVBAR_ASIDE_WIDTH,
  NAVBAR_WIDTH,
} from "../lib/constants";
import ChatNavbar from "./chatNavbar/ChatNavbar";

const ChatLayout = ({ children }) => {
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

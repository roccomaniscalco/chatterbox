import { AppShell, Header } from "@mantine/core";
import ChatNavbar from "./ChatNavbar";

const HEADER_HEIGHT = 70;
const NAVBAR_WIDTH = 80;

const ChatHeader = () => {
  return (
    <Header
      zIndex={-1}
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
};

const ChatLayout = ({ children }) => {
  return (
    <AppShell
      header={<ChatHeader />}
      navbar={<ChatNavbar width={NAVBAR_WIDTH} headerHeight={HEADER_HEIGHT} />}
    >
      {/* <ChatHeader /> */}
      {children}
    </AppShell>
  );
};

export default ChatLayout;

import { AppShell } from "@mantine/core";
import AppNavbar from "../components/appNavbar/AppNavbar";

const ChatLayout = ({ children }) => {
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<AppNavbar />}
    >
      {children}
    </AppShell>
  );
};

export default ChatLayout;


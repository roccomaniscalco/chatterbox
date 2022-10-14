import { Box } from "@mantine/core";
import { HEADER_HEIGHT } from "../../lib/constants";

const ChatHeader = ({ children }) => {
  return (
    <Box
      p="md"
      sx={(theme) => ({
        height: HEADER_HEIGHT,
        width: "100%",
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.fn.rgba(theme.colors.dark[9], 0.7)
            : theme.fn.rgba(theme.white, 0.7),
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[2]
        }`,
        backdropFilter: "blur(40px)",
      })}
    >
      {children}
    </Box>
  );
};

export default ChatHeader;

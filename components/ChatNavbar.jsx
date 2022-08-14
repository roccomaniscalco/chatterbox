import { ActionIcon, Anchor, Center, Navbar, Stack } from "@mantine/core";
import Link from "next/link";
import { number } from "prop-types";
import DarkModeToggle from "./DarkModeToggle";
import IconChatterbox from "./IconChatterbox";
import UserProfile from "./UserProfile";

const ChatNavbar = ({ width, headerHeight }) => {
  return (
    <Navbar
      width={{ base: width }}
      sx={(theme) => ({
        top: 0,
        height: "100vh",
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[1],
        borderColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[2],
      })}
    >
      <Center sx={{ height: headerHeight }}>
        <Link href="/">
          <ActionIcon
            variant="transparent"
            size="xl"
            sx={(theme) => ({
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[4]
                  : theme.colors.gray[6],
              transition: "transform 0.2s",
              "&:hover": {
                color: theme.colors.indigo[5],
                transform: "scale(1.1)",
              },
            })}
          >
            <IconChatterbox size={64} />
          </ActionIcon>
        </Link>
      </Center>

      <Navbar.Section>
        <Center>
          <UserProfile />
        </Center>
      </Navbar.Section>

      <Navbar.Section grow></Navbar.Section>

      <Stack mb="md">
        <DarkModeToggle />
        <Anchor
          size="xs"
          color="dimmed"
          align="center"
          href="https://github.com/roccomaniscalco/chatterbox"
        >
          v0.0.1
        </Anchor>
      </Stack>
    </Navbar>
  );
};

ChatNavbar.propTypes = {
  width: number,
  headerHeight: number,
};

export default ChatNavbar;

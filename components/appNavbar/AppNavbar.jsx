import { ActionIcon, Anchor, Navbar, Stack } from "@mantine/core";
import Link from "next/link";
import DarkModeToggle from "../_common/DarkModeToggle";
import IconChatterbox from "../_common/IconChatterbox";
import UserProfile from "./UserProfile";

const AppNavbar = () => {
  return (
    <Navbar
      p="md"
      width={{ base: 80 }}
      sx={(theme) => ({
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
      <Stack align="center">
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
        <UserProfile />
      </Stack>

      <Navbar.Section grow></Navbar.Section>

      <Stack>
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

export default AppNavbar;
